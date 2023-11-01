import { Module } from '@nestjs/common'
import { PermissionModule } from '../cms-permission/permission.module'
import { CmsController } from './cms.controller'
import { CmsService } from './cms.service'

@Module({
  imports: [PermissionModule],
  controllers: [CmsController],
  providers: [CmsService]
})
export class CmsModule {}
