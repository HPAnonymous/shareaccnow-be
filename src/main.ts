import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import compression from 'compression'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix(`/api/v1`)
  app.use(compression()) // down size response
  app.use(helmet())

  await app.listen(3000)
  console.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()
