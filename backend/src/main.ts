import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
// import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(cookieParser());

  app.useStaticAssets('uploads', { prefix: '/uploads' });
  // OPEN-API
  const config = new DocumentBuilder()
    .setTitle('backend')
    .setDescription('backend endpoints')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //CORS
  app.enableCors({
    origin: ['http://localhost:8000', 'http://localhost:8000/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  const logger: Logger = new Logger('-------------TheAppLoggerIs-----------');
  await app.listen(3000);
  logger.verbose(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
