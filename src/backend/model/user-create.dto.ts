import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UserCreateDto {
  @IsString()
  @ApiProperty()
  readonly first_name: string;

  @IsString()
  @ApiProperty()
  readonly last_name: string;

  @IsString()
  @ApiProperty()
  readonly gender: string;
}