import { Model } from 'mongoose'
import { CreateCatDto } from './dto/create-cat.dto'
import { Cat } from './interfaces/cat.interface'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private readonly catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = this.catModel.create(createCatDto)
    return createdCat
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec()
  }
}
