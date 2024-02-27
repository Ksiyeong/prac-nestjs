import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.NODE_SERVER_PORT;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
