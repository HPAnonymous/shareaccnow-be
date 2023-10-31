import { Global, Module } from '@nestjs/common'
import { ApiKeyService } from './api-key.service'
import { ApiKeysController } from './api-key.controller'
import { ApiKeySchema } from './schemas/api-key.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ApiKey',
        schema: ApiKeySchema,
        collection: 'ApiKeys'
      }
    ])
  ],
  controllers: [ApiKeysController],
  providers: [ApiKeyService],
  exports: [ApiKeyService]
})
export class ApiKeysModule {}
