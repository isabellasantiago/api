import { Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserModel } from "src/common/models/user.model";
import { BcryptRepositoryService } from "src/repository/bcrypt/bcrypt.repository.service";
import { UserRepositoryService } from "src/repository/services/user/user.repository.service";

export class AuthService {
    constructor(
        @Inject(UserRepositoryService) private readonly userRepositoryService: UserRepositoryService,
        @Inject(BcryptRepositoryService) private readonly bcryptRepository: BcryptRepositoryService,
        @Inject(JwtService) private readonly jwtService: JwtService
    ){}


    async validateUser(email: string, passwordReq: string): Promise<Omit<UserModel, 'password'> | null> {
        const user = await this.userRepositoryService.getUserByEmail(email);

        if(!user) throw new NotFoundException('User Not Found');

        const isPasswordMatch = this.bcryptRepository.compare(passwordReq, user.password);

        if(!isPasswordMatch) throw new UnauthorizedException('Invalid password');

        return user;
    }

    async login(user: UserModel) {
        const payload = { email: user.email, sub: user.id, type: user.type, active: user.active}

        return {
            user: {
                id: payload.sub,
                email: payload.email,
                type: payload.type,
                active: payload.active,
            },
            token: this.jwtService.sign(payload),
        }
    };


}