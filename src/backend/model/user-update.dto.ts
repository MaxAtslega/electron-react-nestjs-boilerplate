import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UserUpdateDto {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  first_name: string;

  @IsString()
  @ApiProperty()
  last_name: string;

  @IsString()
  @ApiProperty()
  gender: string;
}