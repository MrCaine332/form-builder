import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { ConfigService } from "@nestjs/config"
import { Injectable } from "@nestjs/common"
import { Request } from "express"

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        AtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: config.get("JWT_ACCESS_TOKEN_SECRET"),
    })
  }

  private static extractJWT(req: Request): string | null {
    if (
      req.cookies &&
      "access_token" in req.cookies &&
      req.cookies.access_token.length > 0
    ) {
      return req.cookies.access_token
    }
    return null
  }

  async validate(payload: any) {
    return payload;
  }
}
