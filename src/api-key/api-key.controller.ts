import { Controller, Post, Body } from '@nestjs/common'
import { ApiKeyService } from './api-key.service'
import { CreateApiKeyDto } from './dto/request.dto'

@Controller('api-key')
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeyService) {}

  @Post()
  async create(@Body() createApiKeyDto: CreateApiKeyDto) {
    return this.apiKeysService.genarateApiKey(createApiKeyDto)
  }
}
