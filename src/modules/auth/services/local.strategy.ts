import { Inject, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserModel } from "src/common/models/user.model";
import { AuthService } from "./auth.service";

export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(AuthService) private readonly authService: AuthService){
        super();
    }

    async validate(email: string, password: string): Promise<Omit<UserModel, 'password'>> {
        const user = await this.authService.validateUser(email, password);

        if(!user) throw new UnauthorizedException();

        return user
    }
}