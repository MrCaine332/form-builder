import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common"
import { UsersService } from "@/modules/users/users.service"
import { CredentialsDto } from "@/modules/auth/dto/credentials.dto"
import { TokensService } from "@/modules/tokens/tokens.service"
import { TokenPayload } from "@/modules/tokens/types/tokenPayload.type"
import * as bcrypt from "bcrypt"
import * as uuid from "uuid"

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokensService: TokensService
  ) {}

  async signIn(credentialsDto: CredentialsDto) {
    const candidate = await this.usersService.findOneByEmail(credentialsDto.email)

    if (!candidate) {
      throw new BadRequestException("Incorrect email or password.")
    }

    const isPasswordEqual = await bcrypt.compare(credentialsDto.password, candidate.password)
    if (!isPasswordEqual) {
      throw new BadRequestException("Incorrect email or password.")
    }

    const deviceId = uuid.v4()

    const payload: TokenPayload = {
      sub: candidate.id,
      email: candidate.email,
      deviceId: deviceId,
    }

    const tokens = await this.tokensService.generateTokens(payload)
    await this.tokensService.saveRefreshToken(tokens.refreshToken, candidate.id, deviceId)

    return { ...tokens, user: candidate }
  }

  async validateEmail(email: string) {
    const candidate = await this.usersService.findOneByEmail(email)

    if (candidate) {
      throw new BadRequestException("Email already in use")
    }

    return true
  }

  async signUp(credentialsDto: CredentialsDto) {
    const candidate = await this.usersService.findOneByEmail(
      credentialsDto.email
    )

    if (candidate) {
      throw new BadRequestException("Email already in use")
    }

    const hashedPassword = await bcrypt.hash(credentialsDto.password, 10)
    const user = await this.usersService.create(
      credentialsDto.email,
      hashedPassword
    )

    return user
  }

  async refresh(userId: number, deviceId: string) {
    const user = await this.usersService.findOneById(userId)

    if (!user) {
      throw new UnauthorizedException()
    }

    const tokens = await this.tokensService.generateTokens({ sub: user.id, email: user.email, deviceId })
    await this.tokensService.saveRefreshToken(tokens.refreshToken, userId, deviceId)

    return { ...tokens, user }
  }

  async signOut(userId: number, deviceId: string) {
    await this.tokensService.deleteRefreshToken(userId, deviceId)
  }

  async googleLogin(user: any) {
    let candidate = await this.usersService.findOneByEmail(user.email)

    if (!candidate) {
      const hashedPassword = await bcrypt.hash(user.accessToken, 10)
      candidate = await this.usersService.create(user.email, hashedPassword)
    }

    const deviceId = uuid.v4()

    const payload: TokenPayload = {
      sub: candidate.id,
      email: candidate.email,
      deviceId: deviceId,
    }

    const tokens = await this.tokensService.generateTokens(payload)
    await this.tokensService.saveRefreshToken(tokens.refreshToken, candidate.id, deviceId)

    return { ...tokens }
  }
}
