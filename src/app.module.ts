import { Module } from '@nestjs/common'
import { CatsModule } from './cats/cats.module'
import { DatabaseModule } from './database/database.module'
import loadConfig from './configs'
import { UsersModule } from './users/users.module'

@Module({
  imports: [loadConfig(), CatsModule, DatabaseModule, UsersModule]
})
export class AppModule {}
