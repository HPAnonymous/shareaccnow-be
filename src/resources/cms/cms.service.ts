import { Injectable } from '@nestjs/common'
import {
  CreatePermissionDto,
  GetPermissionsDto
} from '../cms-permission/dto/requests.dto'
import { PermissionService } from '../cms-permission/permission.service'

@Injectable()
export class CmsService {
  constructor(private readonly permissionService: PermissionService) {}

  async createPermission(createData: CreatePermissionDto) {
    return this.permissionService.createPermissonForAdmin(createData)
  }

  async getPermissions(getPermissionsData: GetPermissionsDto) {
    return this.permissionService.getListPermissionForAdmin(getPermissionsData)
  }
}
