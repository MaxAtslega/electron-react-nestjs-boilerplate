import Strategy from 'passport-headerapikey'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(private authService: AuthService) {
    super({ header: 'x-api-key', prefix: '' }, true,
      async (apiKey, done) => {
        return this.validate(apiKey, done)
      })
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  validate(apiKey: string, done: (error: Error, data) => {}){
    if (this.authService.validateKey(apiKey)) done(null, true)
    done(new UnauthorizedException(), null)
  }
}