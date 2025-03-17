import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from "@nestjs/common"
import { FormsService } from "./forms.service"
import { GetCurrentUserId } from "@/decorators/get-current-user-id.decorator"
import {
  CreateFormBodyDto,
  createFormBodySchema,
} from "@/modules/forms/dto/create-form-body.dto"
import { ZodPipe } from "@/pipes/zod.pipe"
import { Public } from "@/decorators/public.decorator"

@Controller("forms")
export class FormsController {
  constructor(private formsService: FormsService) {}

  /** Statistics endpoints */
  /** ============================================================================== */
  @Get("statistics")
  async getStatistics(@GetCurrentUserId() userId: number) {
    const statistics = this.formsService.getStatistics(userId)
    return statistics
  }

  /** Forms endpoints */
  /** ============================================================================== */
  @Get("")
  async getForms(@GetCurrentUserId() userId: number) {
    const forms = await this.formsService.getForms(userId)
    return forms
  }

  @Get(":id")
  async getForm(
    @GetCurrentUserId() userId: number,
    @Param() params: { id: string }
  ) {
    if (!params.id || isNaN(Number(params.id))) {
      throw new BadRequestException("Incorrect id")
    }

    const form = await this.formsService.getForm(userId, Number(params.id))

    if (!form) {
      throw new NotFoundException("Form was not found")
    }

    return form
  }

  @Public()
  @Get("url/:url")
  async getFormByUrl(@Param() params: { url: string }) {
    if (!params.url) {
      throw new BadRequestException("Incorrect url")
    }

    const form = await this.formsService.getFormByUrl(params.url)

    if (!form) {
      throw new NotFoundException("Form was not found")
    }

    return form
  }

  @Post("")
  async createForm(
    @Body(new ZodPipe(createFormBodySchema)) body: CreateFormBodyDto,
    @GetCurrentUserId() userId: number
  ) {
    const form = await this.formsService.createForm(
      userId,
      body.title,
      body.description
    )
    return form
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  async updateFormContent(
    @GetCurrentUserId() userId: number,
    @Param() params: { id: string },
    @Body() body: { content: string }
  ) {
    if (!params.id || isNaN(Number(params.id))) {
      throw new BadRequestException("Incorrect id")
    }

    const isUpdated = await this.formsService.updateFormContent(
      userId,
      Number(params.id),
      body.content
    )
    return { success: isUpdated }
  }

  @Post("publish/:id")
  @HttpCode(HttpStatus.OK)
  async publishForm(
    @GetCurrentUserId() userId: number,
    @Param() params: { id: string }
  ) {
    if (!params.id || isNaN(Number(params.id))) {
      throw new BadRequestException("Incorrect id")
    }

    await this.formsService.publishForm(userId, Number(params.id))

    return true
  }

  @Public()
  @Post("submit/:url")
  @HttpCode(HttpStatus.OK)
  async submitForm(
    @Param() params: { url: string },
    @Body() body: { content: string }
  ) {
    if (!params.url) {
      throw new BadRequestException("Incorrect url")
    }

    await this.formsService.submitForm(params.url, body.content)

    return true
  }

  /** Details endpoint */
  /** ============================================================================== */
  @Get("details/:id")
  async getFormDetails(
    @GetCurrentUserId() userId: number,
    @Param() params: { id: string }
  ) {
    if (!params.id || isNaN(Number(params.id))) {
      throw new BadRequestException("Incorrect id")
    }

    const details = await this.formsService.getFormDetails(
      userId,
      Number(params.id)
    )

    return details
  }
}
