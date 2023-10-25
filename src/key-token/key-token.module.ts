import { Global, Module } from '@nestjs/common'
import { KeyTokenService } from './key-token.service'
// import { UsersController } from './users.controller'
import { KeyTokenSchema } from './schemas/key-token.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'KeyToken',
        schema: KeyTokenSchema,
        collection: 'keyTokens'
      }
    ])
  ],
  //   controllers: [UsersController],
  providers: [KeyTokenService],
  exports: [KeyTokenService]
})
export class KeyTokenModule {}
