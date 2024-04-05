import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { PrismaService } from './prisma.service'
import { path } from 'app-root-path'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)
  
  app.setGlobalPrefix('api')
  app.use(cookieParser())
  app.enableCors({
    origin: ['http://localhost:3000', 'http://94.26.225.102:3000' ],
    credentials: true,
    exposedHeaders: 'set-cookie'
  })
  await app.listen(4200);
}
bootstrap();
