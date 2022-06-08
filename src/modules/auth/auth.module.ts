import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { RolesGuards } from "src/common/decorators/roles/guards/roles.guard";
import envs from "src/config/envs";
import { RepositoryModule } from "src/repository/repository.module";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { JwtAuthGuard } from "./services/jwt-auth.guard";
import { JwtStrategy } from "./services/strategies/jwt.strategy";
import { LocalStrategy } from "./services/strategies/local.strategy";

@Module({
    imports: [RepositoryModule, PassportModule, JwtModule.register({
        secret: envs.jwtSecret,
        signOptions: { expiresIn: '3600s'},
    })],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard, RolesGuards],
    controllers:[AuthController]
})
export class AuthModule{}