import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { getCorsConfig } from './config/cookie.config'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)

  // Set global prefix
  app.setGlobalPrefix(`api/${process.env.API_VERSION}`)

  // Enable CORS with credentials support
  app.enableCors(getCorsConfig())

  // Enable cookie parser
  app.use(cookieParser())

  const port = process.env.PORT ?? 3000
  await app.listen(port)

  const logger = new Logger('Bootstrap')
  logger.log(
    `🚀 Application is running on: \x1b[36mhttp://localhost:${port}/api/v1\x1b[0m`,
  )

  logger.log(`🌍 Environment: \x1b[33m${process.env.NODE_ENV}\x1b[0m`)
}

bootstrap()
