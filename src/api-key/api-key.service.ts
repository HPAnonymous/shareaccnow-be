import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ApiKey } from './interfaces/api-key.interface'
import { Model } from 'mongoose'
import * as randomString from 'randomstring'
import { CreateApiKeyDto } from './dto/request.dto'

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectModel('ApiKey') private readonly apiKeyModel: Model<ApiKey>
  ) {}

  async validateApiKey(apiKey: string) {
    const validApiKey = await this.apiKeyModel
      .findOne({ apiKey, status: true })
      .lean()
    if (validApiKey) return true
    return false
  }

  async genarateApiKey(createApiKey: CreateApiKeyDto): Promise<ApiKey> {
    let key: string
    let existedKey: string

    do {
      key = randomString.generate({
        length: 32,
        charset: 'alphabetic'
      })

      existedKey = await this.apiKeyModel
        .findOne({
          apiKey: key
        })
        .lean()
    } while (existedKey)

    createApiKey['apiKey'] = key
    return await this.apiKeyModel.create(createApiKey)
  }
}
