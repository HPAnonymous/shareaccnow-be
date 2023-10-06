import { Global, Module } from '@nestjs/common'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'
import { CatSchema } from './schemas/cat.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Cat',
        schema: CatSchema,
        collection: 'cats'
      }
    ])
  ],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {}
