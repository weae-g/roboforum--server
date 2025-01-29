import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
// import * as express from 'express';
// import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:5173', 'https://roboforum-client.onrender.com'],
    credentials: true,
  };

  app.enableCors(corsOptions);

  await app.listen(3000);
}

bootstrap();
