import { Injectable } from "@nestjs/common"
import { PrismaService } from "../../../prisma/prisma.service"

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(email: string, password: string) {
    const user = await this.prisma.user.create({
      data: {
        email,
        password
      }
    })

    return user
  }

  async findOneById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id: id } })
    return user
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email } })
    return user
  }

  async findAll() {}
}
