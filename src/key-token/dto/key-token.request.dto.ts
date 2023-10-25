import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateKeyTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: string

  @ApiProperty()
  @IsNotEmpty()
  publicKey: string

  @ApiProperty()
  @IsNotEmpty()
  privateKey: string
}
