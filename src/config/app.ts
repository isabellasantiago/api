import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import swagger from './swagger';

const config = async (): Promise<INestApplication> => {
  const app = await NestFactory.create(AppModule);

  swagger(app);
  app.enableCors();

  return app;
};

export default config;
