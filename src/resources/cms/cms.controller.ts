import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import {
  CreatePermissionDto,
  GetPermissionsDto
} from '../cms-permission/dto/requests.dto'
import { CmsService } from './cms.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Cms')
@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Post('permissions')
  //   @ApiBearerAuth()
  //   @ApiOkResponse({
  //     description: 'Create permission'
  //   })
  async createPermission(@Body() createData: CreatePermissionDto) {
    return this.cmsService.createPermission(createData)
  }

  @Get('permissions')
  //   @ApiBearerAuth()
  //   @ApiOkResponse({
  //     description: 'Create permission'
  //   })
  async getPermissions(@Query() getPermissionsData: GetPermissionsDto) {
    return this.cmsService.getPermissions(getPermissionsData)
  }
}
