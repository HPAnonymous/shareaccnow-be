import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { CreateUserDto } from './dto/user-requests.dto'
import { User } from './interfaces/user.interface'
import * as bcrypt from 'bcrypt'
import { omit } from 'lodash'

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

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

      return this.userModel.create(newUser)
    } catch (error) {
      console.log(
        '🚀 ~ file: users.service.ts:31 ~ UsersService ~ create ~ error:',
        error
      )

      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
