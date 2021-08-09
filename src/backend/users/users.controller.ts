import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, HttpStatus, Res } from '@nestjs/common'
import { UsersService } from './users.service'
import { UserDto } from '../model/user.dto'
import { Response } from 'express'
import { LocalAuthGuard } from '../auth/local-auth.guard'
import { UserCreateDto } from '../model/user-create.dto'
import { UserUpdateDto } from '../model/user-update.dto'
import {
  ApiBody,
  ApiCreatedResponse,
  ApiHeader, ApiNoContentResponse, ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger'

@ApiHeader({
  name: 'x-api-key',
  description: 'API Key',
})
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({ description: 'List all users.', type: UserDto })
  findAll(@Res() res: Response) {
    return res.status(HttpStatus.OK).json(this.usersService.findAll())
  }

  @Get(':id')
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({ description: 'List a user by id.', type: UserDto })
  @ApiNotFoundResponse({description: 'User not found'})
  async findOne(@Param('id') id: string, @Res() res: Response) {
    return res.status(HttpStatus.OK).json(this.usersService.findOne(id))
  }

  @Post()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: [UserCreateDto] })
  @ApiCreatedResponse({ description: 'Create a new user.', type: UserDto })
  async create(@Body() user: UserCreateDto, @Res() res: Response) {
    const newUser: UserDto = this.usersService.create(user)
    return res.status(HttpStatus.CREATED).json(newUser)
  }

  @Put()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: [UserUpdateDto] })
  @ApiOkResponse({ description: 'Update user data.', type: UserDto })
  @ApiNotFoundResponse({description: 'User not found'})
  update(@Body() user: UserUpdateDto, @Res() res: Response) {
    this.usersService.update(user)
    return res.status(HttpStatus.OK).json(user)
  }

  @Delete(':id')
  @UseGuards(LocalAuthGuard)
  @ApiNoContentResponse({ description: 'Delete a user by id.' })
  @ApiNotFoundResponse({description: 'User not found'})
  delete(@Param('id') id: string, @Res() res: Response) {
    this.usersService.delete(id)
    return res.status(HttpStatus.NO_CONTENT).send()
  }
}
