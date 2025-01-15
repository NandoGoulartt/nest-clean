import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  UsePipes,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'

const creatAccountBodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
})

type CreatAccountBodySchema = z.infer<typeof creatAccountBodySchema>

@Controller('/accounts')
export class AccountContoller {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getAccountAll() {
    return await this.prisma.user.findMany()
  }

  @Post()
  @UsePipes(new ZodValidationPipe(creatAccountBodySchema))
  async handle(@Body() body: CreatAccountBodySchema) {
    const { name, email, password } = creatAccountBodySchema.parse(body)

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException(
        'User with same e-mail address already exists.',
      )
    }

    const hashedPassword = await hash(password, 8)

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
  }
}
