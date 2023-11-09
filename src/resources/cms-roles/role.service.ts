import { InjectModel } from '@nestjs/mongoose'
import { Role } from './interface/role.interface'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { CreateRoleDto } from './dto/requests.dto'
import { PermissionService } from '../cms-permission/permission.service'

@Injectable()
export class RoleService {
  constructor(
    @InjectModel('Role') private roleModel: Model<Role>,
    private readonly permissionService: PermissionService
  ) {}

  async createRole(createRole: CreateRoleDto) {
    const role = await this.checkRoleExisted(createRole.title)

    if (role) {
      throw new HttpException('Role already exist', HttpStatus.CONFLICT)
    }
    createRole['permissions'] = createRole.createPermissionId
    const newRole = await this.roleModel.create(createRole)

    await Promise.all(
      createRole.createPermissionId.map(async (permissionId) => {
        const roles = await this.permissionService.getRoleByPermissionId(
          permissionId
        )

        const newRoleInPermission = [...roles, newRole.id]

        await this.permissionService.uppdatePermission(permissionId, {
          roles: newRoleInPermission
        })
      })
    )

    return newRole.toObject()
  }

  async checkRoleExisted(title: string) {
    const filter = {
      title: title,
      isDeleted: false
    }

    const role = await this.roleModel.findOne(filter).lean()

    if (role) {
      return true
    }

    return false
  }
}
