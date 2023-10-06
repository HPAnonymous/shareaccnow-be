import { Module } from '@nestjs/common'
import { CatsModule } from './cats/cats.module'
import { DatabaseModule } from './database/database.module'
import loadConfig from './configs'

@Module({
  imports: [loadConfig(), CatsModule, DatabaseModule]
})
export class AppModule {}
