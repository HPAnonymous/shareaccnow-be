import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Permission } from './interface/permission.interface'
// import { CustomLogger } from '../common/logger/custom-logger'
import { CreatePermissionDto, GetPermissionsDto } from './dto/requests.dto'
// import { UpdatePermissionDto } from './dto/requests.dto'

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel('Permission') private permissionModel: Model<Permission> // private logService: CustomLogger
  ) {}

  async getListPermissionForAdmin(
    getPermissionsData: GetPermissionsDto,
    isCounting = false
  ) {
    // isCounting = false,
    // keyword = null,
    // start = 0,
    // length = 50,
    // sortBy = '_id',
    // sortType = 'asc'

    const { keyword, sortType, sortBy, offset, limit } = getPermissionsData
    try {
      const filter = {
        isDeleted: false
      }
      if (keyword) {
        filter['$or'] = [
          { name: { $regex: new RegExp(`.*${keyword}.*`, 'i') } },
          { title: { $regex: new RegExp(`.*${keyword}.*`, 'i') } },
          { description: { $regex: new RegExp(`.*${keyword}.*`, 'i') } }
        ]
      }

      if (isCounting) {
        return await this.permissionModel.countDocuments(filter)
      }

      const sortObj = {}
      sortObj[sortBy] = sortType

      if (limit === -1) {
        return await this.permissionModel.find(filter).sort(sortObj)
      }
      return await this.permissionModel
        .find(filter)
        .sort(sortObj)
        .limit(limit)
        .skip(offset)
    } catch (e) {
      //   this.logService.error({
      //     name: 'PermissionService/listing',
      //     e
      //   })
      console.log('permission service error:::', e)
    }

    if (isCounting) {
      return 0
    }
    return []
  }

  async createPermissonForAdmin(createPermisson: CreatePermissionDto) {
    const existPermisson = await this.checkExistByKey(createPermisson.key)

    if (existPermisson)
      throw new HttpException('Permission already exist.', HttpStatus.CONFLICT)

    return await this.permissionModel.create(createPermisson)
  }

  //   async updatePermissionForAdmin(
  //     permissionId: string,
  //     updatePermissonDto: PermissionUpdateDto
  //   ) {
  //     const permission = await this.permissionModel.findOne({ _id: permissionId })

  //     if (!permission)
  //       throw new HttpException('Permission not found.', HttpStatus.NOT_FOUND)

  //     return await this.permissionModel.findByIdAndUpdate(
  //       permissionId,
  //       updatePermissonDto,
  //       {
  //         new: true
  //       }
  //     )
  //   }

  //   async findRolesById(id) {
  //     try {
  //       const permission = await this.permissionModel.findById(id)

  //       if (permission) {
  //         return permission.roles
  //       } else {
  //       }
  //     } catch (e) {
  //       this.logService.error({
  //         name: 'PermissionService/update',
  //         e
  //       })
  //     }
  //   }

  async checkExistByKey(key: string) {
    const filter = { key: key, isDeleted: false }

    const permission = await this.permissionModel.findOne(filter)

    if (permission) {
      return true
    }

    return false
  }

  //   async checkPermission(roleId: number, key: string) {
  //     try {
  //       const filter = { key: key, roles: roleId, isDeleted: false }

  //       const permission = await this.permissionModel.findOne(filter)

  //       if (permission) {
  //         return true
  //       }
  //     } catch (e) {
  //       //   this.logService.error({
  //       //     name: 'PermissionService/checkExist',
  //       //     e
  //       //   })
  //     }

  //     return false
  //   }
}
