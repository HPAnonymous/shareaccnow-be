import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PermissionService } from './permission.service'
import { PermissionSchema } from './schemas/permission.schemas'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Permission',
        schema: PermissionSchema,
        collection: 'Permissions'
      }
    ])
  ],
  controllers: [],
  providers: [PermissionService],
  exports: [PermissionService]
})
export class PermissionModule {}
