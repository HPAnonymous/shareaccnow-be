import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import loadConfig from './configs'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { KeyTokenModule } from './key-token/key-token.module'

@Module({
  imports: [
    loadConfig(),
    DatabaseModule,
    UsersModule,
    AuthModule,
    KeyTokenModule
  ]
})
export class AppModule {}
