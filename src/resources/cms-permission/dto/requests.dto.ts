import { PaginationQueriesDto } from '@/common/guards/dto/pagination.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreatePermissionDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  key: string

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  title: string

  @ApiProperty({ type: String, required: false })
  @IsNotEmpty()
  @IsOptional()
  description?: string

  @ApiProperty({ type: Boolean, required: false })
  @IsOptional()
  isDeleted?: boolean
}

export class UpdatePermissionDto {
  @ApiProperty({ type: String, required: false })
  @IsNotEmpty()
  @IsOptional()
  title?: string

  @ApiProperty({ type: String, required: false })
  @IsNotEmpty()
  @IsOptional()
  description?: string

  @ApiProperty({ type: Boolean, required: false })
  @IsNotEmpty()
  @IsOptional()
  isDeleted?: boolean

  @ApiProperty({ type: String, required: false })
  @IsNotEmpty()
  @IsOptional()
  key?: string
}

export class GetPermissionsDto extends PaginationQueriesDto {
  @ApiProperty({ type: String, required: false, default: null })
  @IsNotEmpty()
  @IsOptional()
  keyword?: string

  @ApiProperty({ type: String, required: false, default: '_id' })
  @IsOptional()
  sortBy: string

  @ApiProperty({ type: String, required: false, default: 'asc' })
  @IsOptional()
  sortType: string
}
