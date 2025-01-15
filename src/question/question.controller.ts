import { Controller, Post } from '@nestjs/common'

@Controller('/questions')
export class QuestionContoller {
  @Post()
  async handle() {
    return 'teste'
  }
}
