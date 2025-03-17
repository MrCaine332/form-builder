import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { ConfigService } from "@nestjs/config"
import { Request } from "express"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { TokenPayload } from "@/modules/tokens/types/tokenPayload.type"
import { TokensService } from "@/modules/tokens/tokens.service"
import { UsersService } from "@/modules/users/users.service"

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, "refresh-jwt") {
  constructor(
    config: ConfigService,
    private tokensService: TokensService,
    private usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: config.get("JWT_REFRESH_TOKEN_SECRET"),
      passReqToCallback: true,
    })
  }

  async validate(req: Request, payload: TokenPayload) {
    const refreshToken = RtStrategy.extractJWT(req)

    if (!refreshToken || !payload.sub || !payload.deviceId) {
      throw new UnauthorizedException()
    }

    const user = await this.usersService.findOneById(payload.sub)
    if (!user) {
      throw new UnauthorizedException()
    }

    const existingToken = await this.tokensService.findRefreshToken(
      refreshToken,
      payload.deviceId
    )
    if (!existingToken || existingToken.userId !== payload.sub) {
      throw new UnauthorizedException()
    }

    return {
      ...payload,
      refreshToken,
    }
  }

  private static extractJWT(req: Request): string | null {
    if (
      req.cookies &&
      "refresh_token" in req.cookies &&
      req.cookies.refresh_token.length > 0
    ) {
      return req.cookies.refresh_token
    }
    return null
  }
}
