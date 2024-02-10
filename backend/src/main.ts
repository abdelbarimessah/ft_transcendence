import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // <-- change this line
  app.use(cookieParser());

  // Serve static files
  // app.useStaticAssets(join(__dirname, '..', 'uploads'), {
  //   prefix: '/uploads/',
  // });
  app.useStaticAssets('uploads', { prefix: '/uploads' });

  app.use(
    cors({
      origin: 'http://localhost:8000',
      credentials: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import * as cors from 'cors';
// import * as express from 'express';
// import { join } from 'path';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.use(cors({
//     origin: 'http://localhost:8000',
//     credentials: true
//   }));
//   app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
//   await app.listen(3000);
// }
// bootstrap();
