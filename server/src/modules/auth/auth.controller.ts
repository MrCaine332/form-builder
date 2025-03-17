import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Redirect,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common"
import { AuthService } from "./auth.service"
import {
  CredentialsDto,
  credentialsSchema,
} from "@/modules/auth/dto/credentials.dto"
import { ZodPipe } from "@/pipes/zod.pipe"
import { RtGuard } from "@/modules/auth/guards/rt.guard"
import { Public } from "@/decorators/public.decorator"
import { Request, Response } from "express"
import { TokenPayload } from "@/modules/tokens/types/tokenPayload.type"
import { GoogleGuard } from "@/modules/auth/guards/google.guard"
import { z } from "zod"

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("signin")
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() credentials: CredentialsDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { refreshToken, accessToken, user } =
      await this.authService.signIn(credentials)

    res.cookie("access_token", accessToken, { httpOnly: true })
    res.cookie("refresh_token", refreshToken, { httpOnly: true })

    return { id: user.id, email: user.email }
  }

  @Public()
  @Post("validate-email")
  @HttpCode(HttpStatus.OK)
  async validateEmail(
    @Body("email", new ZodPipe(z.string().email("Incorrect email format.")))
    email: string
  ) {
    await this.authService.validateEmail(email)
  }

  @Public()
  @Post("signup")
  async signUp(
    @Body(new ZodPipe(credentialsSchema)) credentials: CredentialsDto,
    @Res({ passthrough: true }) res: Response
  ) {
    await this.authService.signUp(credentials)

    const { refreshToken, accessToken, user } =
      await this.authService.signIn(credentials)

    res.cookie("access_token", accessToken, { httpOnly: true })
    res.cookie("refresh_token", refreshToken, { httpOnly: true })

    return { id: user.id, email: user.email }
  }

  @Public()
  @UseGuards(RtGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const {
      refreshToken: refreshTokenFromCookie,
      sub,
      deviceId,
    } = req.user as TokenPayload & {
      refreshToken: string
    }

    const { refreshToken, accessToken, user } = await this.authService.refresh(
      sub,
      deviceId
    )

    res.cookie("access_token", accessToken, { httpOnly: true })
    res.cookie("refresh_token", refreshToken, { httpOnly: true })

    return { id: user.id, email: user.email }
  }

  @Post("signout")
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { deviceId, sub } = req.user as TokenPayload

    await this.authService.signOut(sub, deviceId)

    res.cookie("access_token", "", { expires: new Date(Date.now()) })
    res.cookie("refresh_token", "", { expires: new Date(Date.now()) })
  }

  @Public()
  @UseGuards(GoogleGuard)
  @Get("google")
  google(@Req() req: Request) {}

  @Public()
  @UseGuards(GoogleGuard)
  @Get("google/redirect")
  @Redirect("http://localhost:3000", 302)
  async googleLogin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    if (!req.user) {
      throw new UnauthorizedException()
    }

    const { accessToken, refreshToken } = await this.authService.googleLogin(
      req.user
    )

    res.cookie("access_token", accessToken, { httpOnly: true })
    res.cookie("refresh_token", refreshToken, { httpOnly: true })
  }
}
