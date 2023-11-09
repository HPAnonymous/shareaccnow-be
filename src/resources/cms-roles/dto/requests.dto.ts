import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateRoleDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  title: string

  @ApiProperty({ type: String, required: false })
  @IsNotEmpty()
  @IsOptional()
  description?: string

  @ApiProperty({ type: Boolean, required: false })
  @IsOptional()
  createPermissionId?: Array<number>
}
