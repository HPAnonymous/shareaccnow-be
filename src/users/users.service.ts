import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/user-requests.dto'
import { User } from './interfaces/user.interface'

@Injectable()
export class CatsService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = this.userModel.create(createUserDto)
    return createdUser
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec()
  }
}
