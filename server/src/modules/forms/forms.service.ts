import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../../../prisma/prisma.service"

@Injectable()
export class FormsService {
  constructor(private prisma: PrismaService) {}

  /** Statistics endpoints */
  /** ============================================================================== */
  async getStatistics(userId: number) {
    const { _sum } = await this.prisma.form.aggregate({
      where: {
        userId: userId,
      },
      _sum: {
        visits: true,
        submissions: true,
      },
    })

    const { visits, submissions } = _sum

    let submissionRate = 0
    if (visits && submissions && visits > 0) {
      submissionRate = (submissions / visits) * 100
    }

    const bounceRate = 100 - submissionRate

    const statistics = {
      visits: visits || 0,
      submissions: submissions || 0,
      submissionRate,
      bounceRate,
    }

    return statistics
  }

  async getFormStatistics(userId: number, formId: number) {
    const form = await this.prisma.form.findUnique({
      where: {
        id: formId,
        userId: userId,
      },
      select: {
        visits: true,
        submissions: true,
      },
    })

    if (!form) {
      throw new NotFoundException()
    }

    const { visits, submissions } = form

    let submissionRate = 0
    if (visits && submissions && visits > 0) {
      submissionRate = (submissions / visits) * 100
    }

    const bounceRate = 100 - submissionRate

    const statistics = {
      visits: visits || 0,
      submissions: submissions || 0,
      submissionRate,
      bounceRate,
    }

    return statistics
  }

  /** Forms endpoints */
  /** ============================================================================== */
  async getForms(userId: number) {
    const forms = await this.prisma.form.findMany({
      where: { userId },
      select: this.prisma.exclude("Form", ["content"]),
    })
    return forms
  }

  async getForm(
    userId: number,
    formId: number,
  ) {
    const form = await this.prisma.form.findUnique({
      where: {
        id: formId,
        userId,
      },
    })
    return form
  }

  async getFormByUrl(url: string) {
    const existingForm = await this.prisma.form.findUnique({
      where: {
        shareURL: url,
        isPublished: true
      }
    })

    if (!existingForm) {
      throw new NotFoundException()
    }

    const form = await this.prisma.form.update({
      where: {
        id: existingForm.id
      },
      data: {
        visits: {
          increment: 1
        }
      },
      select: {
        title: true,
        description: true,
        content: true,
        shareURL: true
      }
    })
    return form
  }

  async createForm(userId: number, title: string, description: string) {
    const form = await this.prisma.form.create({
      data: {
        userId,
        title,
        description,
        content: "[]",
      },
    })
    return form
  }

  async updateFormContent(userId: number, formId: number, content: string) {
    const form = await this.prisma.form.findUnique({
      where: {
        id: formId,
        userId,
        isPublished: false,
      },
    })

    if (!form) {
      throw new NotFoundException()
    }

    await this.prisma.form.update({
      where: { userId, id: formId },
      data: {
        content: content,
      },
    })

    return true
  }

  async publishForm(userId: number, formId: number) {
    const form = await this.prisma.form.update({
      where: { userId, id: formId },
      data: {
        isPublished: true,
      },
    })
    return form
  }

  async submitForm(formUrl: string, content: string) {
    const form = await this.prisma.form.findUnique({
      where: {
        shareURL: formUrl
      }
    })

    if (!form) {
      throw new NotFoundException()
    }

    await this.prisma.form.update({
      where: {
        id: form.id
      },
      data: {
        submissions: {
          increment: 1
        },
        FormSubmission: {
          create: {
            content
          }
        }
      }
    })

    return true
  }

  /** Details endpoint */
  /** ============================================================================== */
  async getFormDetails(userId: number, formId: number) {
    const form = await this.prisma.form.findUnique({
      where: {
        id: formId,
        userId,
        isPublished: true
      },
    })

    if (!form) {
      throw new NotFoundException()
    }

    const statistics = await this.getFormStatistics(userId, formId)

    const submissions = await this.prisma.formSubmission.findMany({
      where: { formId: form.id },
    })

    return {
      form,
      statistics,
      submissions,
    }
  }
}
