import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { UsersModule } from "@/modules/users/users.module"
import { AtStrategy } from "@/modules/auth/strategies/at.strategy"
import { RtStrategy } from "@/modules/auth/strategies/rt.strategy"
import { JwtModule } from "@nestjs/jwt"
import { TokensModule } from "@/modules/tokens/tokens.module"
import { GoogleStrategy } from "@/modules/auth/strategies/google.strategy"

@Module({
  imports: [UsersModule, TokensModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, GoogleStrategy],
})
export class AuthModule {}
