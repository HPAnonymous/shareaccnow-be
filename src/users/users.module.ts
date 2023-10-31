import { Global, Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UserSchema } from './schemas/user.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { AccessSerive } from '@/utils/access.service'
import { RolesGuard } from '@/common/guards/roles.guard'
import { APP_GUARD } from '@nestjs/core'

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
  providers: [
    UsersService,
    AccessSerive,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
  exports: [UsersService]
})
export class UsersModule {}
