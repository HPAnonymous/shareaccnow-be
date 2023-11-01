import { IsNumber, Min, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class PaginationQueriesDto {
  @ApiProperty({
    required: false,
    default: 0
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number

  @ApiProperty({
    required: false,
    default: 10
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number
}

export class PaginationResponseDto {
  @ApiProperty({
    required: false,
    default: 0
  })
  @IsNumber()
  @Min(0)
  total: number

  @ApiProperty({
    required: false,
    default: 0
  })
  @IsNumber()
  @Min(0)
  offset: number

  @ApiProperty({
    required: false,
    default: 10
  })
  @IsNumber()
  @Min(1)
  limit: number
}
