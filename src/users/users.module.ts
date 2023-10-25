import { Global, Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UserSchema } from './schemas/user.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { AccessSerive } from '@/utils/access.service'

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
        collection: 'users'
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService, AccessSerive],
  exports: [UsersService]
})
export class UsersModule {}
