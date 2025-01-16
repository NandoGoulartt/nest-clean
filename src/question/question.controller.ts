import { Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.strategy'

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class QuestionController {
  constructor() {}
  @Post()
  async handle() {
    return 'ok'
  }
}
