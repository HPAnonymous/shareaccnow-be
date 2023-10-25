import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
// import { CreateUserDto } from './dto/user-requests.dto'
import { KeyToken } from './interfaces/key-token.interface'
import { CreateKeyTokenDto } from './dto/key-token.request.dto'
// import * as bcrypt from 'bcrypt'
import { omit } from 'lodash'
// import * as crypto from 'crypto'

@Injectable()
export class KeyTokenService {
  constructor(
    @InjectModel('KeyToken') private readonly keyTokenModel: Model<KeyToken>
  ) {}

  async createKeyToken(createKeyTokenDto: CreateKeyTokenDto): Promise<string> {
    try {
      const publicKeyString = createKeyTokenDto.publicKey.toString()
      const privateKeyString = createKeyTokenDto.privateKey.toString()
      const keyToken = omit(createKeyTokenDto, ['publicKey', 'privateKey'])
      keyToken['publicKey'] = publicKeyString
      keyToken['privateKey'] = privateKeyString

      const result = await this.keyTokenModel.create(keyToken)
      //return publicKey
      return result ? result.publicKey : null
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
