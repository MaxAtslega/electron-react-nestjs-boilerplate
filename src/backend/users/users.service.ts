import { Injectable, NotFoundException } from '@nestjs/common'
import { UserDto } from '../model/user.dto'
import { UserUpdateDto } from '../model/user-update.dto'
import { UserCreateDto } from '../model/user-create.dto'

@Injectable()
export class UsersService {
  users: UserDto[] = [
    {
      id: '750d',
      first_name: 'Toby',
      last_name: 'Morley',
      gender: 'male',
    },
    {
      id: '85dd',
      first_name: 'Kyle',
      last_name: 'Pope',
      gender: 'male',
    },
    {
      id: '2f50',
      first_name: 'Sophia',
      last_name: 'Gordon',
      gender: 'female',
    },
    {
      id: 'f927',
      first_name: 'Billy',
      last_name: 'Hurst',
      gender: 'male',
    },
    {
      id: '1af8',
      first_name: 'Shannon',
      last_name: 'Knowles',
      gender: 'female',
    }
  ]


  findAll(): UserDto[] {
    return this.users
  }

  create(user: UserCreateDto): UserDto {
    const id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    this.users.push({id, ...user})
    return {id, ...user}
  }

  findOne(id: string): UserDto {
    const user = this.users.find((user) => user.id === id)
    if(user){
      return user
    }
    throw new NotFoundException('User not found')
  }

  update(user: UserUpdateDto): UserDto {
    if(this.users.find((data) => data.id === user.id)){
      const users = this.users.filter((data) => data.id !== user.id)
      users.push(user)
      this.users = users
      return user
    }
    throw new NotFoundException('User not found')
  }

  delete(id: string) {
    if(this.users.find((user) => user.id === id)){
      this.users = this.users.filter((user) => user.id !== id)
      return
    }
    throw new NotFoundException('User not found')
  }


}