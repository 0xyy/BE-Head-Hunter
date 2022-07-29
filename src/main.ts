import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException(`Błąd walidacji.`);
      },
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
