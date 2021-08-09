import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'

@Module({
  imports: [PassportModule],
  providers: [LocalStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}