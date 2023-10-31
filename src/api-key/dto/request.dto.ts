import { IsEnum, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Permission } from './general.dto'

export class CreateApiKeyDto {
  @IsNotEmpty()
  @ApiProperty({
    enum: Permission,
    required: true
  })
  @IsEnum(Permission)
  permissions?: Permission
}
