import { Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserModel } from "src/common/models/user.model";
import { BcryptRepositoryService } from "src/repository/bcrypt/bcrypt.repository.service";
import { UserRepositoryService } from "src/repository/services/user/user.repository.service";

export class AuthService {
    constructor(@Inject(UserRepositoryService) private readonly userRepositoryService: UserRepositoryService, @Inject(BcryptRepositoryService) private readonly bcryptRepository: BcryptRepositoryService){}


    async validateUser(email: string, passwordReq: string): Promise<Omit<UserModel, 'password'> | null> {
        const user = await this.userRepositoryService.getUserByEmail(email);

        if(!user) throw new NotFoundException('User Not Found');

        const isPasswordMatch = this.bcryptRepository.compare(passwordReq, user.password);

        if(!isPasswordMatch) throw new UnauthorizedException('Invalid password');

        return user;
    }


}