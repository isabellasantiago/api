import {
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserType } from 'src/common/enums/user-type.enum';
import { UserModel } from 'src/common/models/user.model';
import { BcryptRepositoryService } from 'src/repository/bcrypt/bcrypt.repository.service';
import { CandidateRepositoryService } from 'src/repository/services/candidate/candidate.repository.service';
import { CompanyRepositoryService } from 'src/repository/services/company/company.repository.service';
import { UserRepositoryService } from 'src/repository/services/user/user.repository.service';

export class AuthService {
  constructor(
    @Inject(UserRepositoryService)
    private readonly userRepositoryService: UserRepositoryService,
    @Inject(CompanyRepositoryService)
    private readonly companyRepositoryService: CompanyRepositoryService,
    @Inject(CandidateRepositoryService)
    private readonly candidateRepositoryService: CandidateRepositoryService,
    @Inject(BcryptRepositoryService)
    private readonly bcryptRepository: BcryptRepositoryService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    passwordReq: string,
  ): Promise<Omit<UserModel, 'password'> | null> {
    const user = await this.userRepositoryService.getUserByEmail(email);

    if (!user) throw new NotFoundException('User Not Found');

    const isPasswordMatch = this.bcryptRepository.compare(
      passwordReq,
      user.password,
    );

    if (!isPasswordMatch) throw new UnauthorizedException('Invalid password');

    return user;
  }

  async getIDByUserType(type: string, userID: number): Promise<number> {
    const findUser = await this.userRepositoryService.getUserByID(userID);

    if (!findUser) throw new NotFoundException('User Not Found');

    console.log('userId', userID);
    if (type === UserType.COMPANY) {
      const company = await this.companyRepositoryService.getCompanyByUserID(
        userID,
      );
      if (!company) throw new NotFoundException('Company Not Found');

      return company.id;
    }
    const candidate =
      await this.candidateRepositoryService.getCandidateByUserID(userID);
    if (!candidate) throw new NotFoundException('Candidate Not Found');

    return candidate.id;
  }

  async login(user: UserModel) {
    const userExists = await this.userRepositoryService.getUserByID(user.id);
    if (!userExists) throw new NotFoundException('User Not Found');

    const payload = {
      email: user.email,
      sub: await this.getIDByUserType(user.type, user.id),
      type: user.type,
      active: user.active,
    };

    return {
      user: {
        id: payload.sub,
        email: payload.email,
        type: payload.type,
        active: payload.active,
      },
      token: this.jwtService.sign(payload),
    };
  }
}
