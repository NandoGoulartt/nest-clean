import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { AccountContoller } from './user/controllers/account.controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { AuthenticateContoller } from './auth/authenticate.controller'
import { QuestionController } from './question/question.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [AccountContoller, AuthenticateContoller, QuestionController],
  providers: [PrismaService],
})
export class AppModule {}
