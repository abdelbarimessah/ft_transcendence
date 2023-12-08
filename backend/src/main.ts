import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   const corsOptions: CorsOptions = {
//     origin: 'http://localhost:8000', // Replace with your frontend URL
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//   };

//   app.enableCors(corsOptions);

//   await app.listen(3000);
// }
// bootstrap();
