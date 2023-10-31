import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { CreateUserDto } from './dto/user-requests.dto'
import { User } from './interfaces/user.interface'
import * as bcrypt from 'bcrypt'
import { omit } from 'lodash'
import { KeyTokenService } from '@/key-token/key-token.service'
import * as crypto from 'crypto'
import { AccessSerive } from '@/utils/access.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly keyTokenService: KeyTokenService,
    private readonly accessService: AccessSerive
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existedUser = await this.userModel.findOne({
        email: createUserDto.email
      })

      if (existedUser) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT)
      }

      const salt = await bcrypt.genSalt(10)

      const newUser = omit(createUserDto, ['password'])

      newUser['password'] = await bcrypt.hash(createUserDto.password, salt)

      const createdUser = await this.userModel.create(newUser)
      // check createdUser and create private key and publib key

      if (createdUser) {
        //create privateKey and publicKey
        // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        //   modulusLength: 4096,
        //   publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
        //   privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
        // })

        const publicKey = crypto.randomBytes(64).toString('hex')
        const privateKey = crypto.randomBytes(64).toString('hex')

        await this.keyTokenService.createKeyToken({
          userId: createdUser._id,
          publicKey,
          privateKey
        })

        // const publicKeyObject = crypto.createPublicKey(keyStore)

        // public key get from mongodb not from generate
        const tokens = await this.accessService.createTokenPair(
          { userId: createdUser._id, email: createdUser.email },
          publicKey,
          privateKey
        )

        console.log('tokens::: ', tokens)
      }
      return createdUser
    } catch (error) {
      console.log(
        '🚀 ~ file: users.service.ts:41 ~ UsersService ~ create ~ error:',
        error
      )

      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
