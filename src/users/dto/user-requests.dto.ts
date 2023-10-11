import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { UserStatus } from './general.dto'

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  password: string

  @ApiProperty()
  @IsOptional()
  name: string

  @ApiProperty()
  @IsNotEmpty()
  role: string

  @ApiProperty()
  @IsOptional()
  verified: boolean

  @ApiProperty()
  @IsOptional()
  mobile: string

  @ApiProperty({
    enum: UserStatus,
    required: false
  })
  @IsOptional()
  @IsEnum(UserStatus)
  status: UserStatus
}
