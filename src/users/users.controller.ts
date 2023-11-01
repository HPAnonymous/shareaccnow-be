import { Controller, Post, Body, UseGuards } from '@nestjs/common'

import { UsersService } from './users.service'
import { CreateUserDto } from './dto/user-requests.dto'
import { ApiKeyGuard } from '@/utils/api-key-guard.service'
import { Roles } from '@/core/decorators/roles.decorator'
import { Role } from '../users/dto/general.dto'
import { RolesGuard } from '@/common/guards/roles.guard'

@Controller('users')
@UseGuards(ApiKeyGuard)
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }
}
