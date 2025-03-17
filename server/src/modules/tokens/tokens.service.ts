import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"
import { TokenPayload } from "@/modules/tokens/types/tokenPayload.type"
import { PrismaService } from "../../../prisma/prisma.service"

@Injectable()
export class TokensService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    private prisma: PrismaService
  ) {}

  async generateTokens(payload: TokenPayload) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.get("JWT_ACCESS_TOKEN_SECRET"),
        expiresIn: Number(this.config.get("JWT_ACCESS_TOKEN_EXPIRATION_TIME")),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.get("JWT_REFRESH_TOKEN_SECRET"),
        expiresIn: Number(this.config.get("JWT_REFRESH_TOKEN_EXPIRATION_TIME")),
      }),
    ])

    return { accessToken: at, refreshToken: rt }
  }

  async saveRefreshToken(
    refreshToken: string,
    userId: number,
    deviceId: string
  ) {
    const existingToken = await this.prisma.token.findUnique({
      where: { userId, deviceId },
    })

    if (existingToken) {
      await this.prisma.token.update({
        where: { id: existingToken.id },
        data: { refreshToken },
      })
    } else {
      await this.prisma.token.create({
        data: { userId, refreshToken, deviceId },
      })
    }
  }

  async findRefreshToken(refreshToken: string, deviceId: string) {
    const token = await this.prisma.token.findUnique({
      where: { refreshToken, deviceId },
    })
    return token
  }

  async deleteRefreshToken(userId: number, deviceId: string) {
    await this.prisma.token.delete({ where: { userId, deviceId } })
  }
}
