import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import envs from "src/config/envs";
import { RepositoryModule } from "src/repository/repository.module";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { JwtStrategy } from "./services/strategies/jwt.strategy";
import { LocalStrategy } from "./services/strategies/local.strategy";

@Module({
    imports: [RepositoryModule, PassportModule, JwtModule.register({
        secret: envs.jwtSecret,
        signOptions: { expiresIn: '60s'},
    })],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers:[AuthController]
})
export class AuthModule{}