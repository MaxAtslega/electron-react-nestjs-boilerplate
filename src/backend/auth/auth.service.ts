import { Injectable } from '@nestjs/common'
import Store from 'electron-store'
const store = new Store()

@Injectable()
export class AuthService {
  validateKey(apiKey: string): boolean {
    return apiKey === store.get('key')
  }
}