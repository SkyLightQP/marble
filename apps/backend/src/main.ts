import { AppModule } from '@app.module';
import { winstonLoggerConfig } from '@infrastructure/utils/logger.util';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { InternalServerExceptionFilter } from '@infrastructure/filters/internal-server-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLoggerConfig
  });
  const config = app.get<ConfigService>(ConfigService);
  const corsDevOrigin = config.get<string>('CORS_DEVELOPMENT_ORIGIN', '');
  const corsProdOrigin = config.get<string>('CORS_PRODUCTION_ORIGIN', '');
  const apiPrefix = config.get<string>('API_PREFIX', '/');

  app.setGlobalPrefix(apiPrefix);
  app.use(helmet());
  app.enableCors({
    credentials: true,
    origin: [corsDevOrigin, corsProdOrigin],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD']
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );
  app.useGlobalFilters(new InternalServerExceptionFilter());
  app.use(cookieParser());

  await app.listen(8080);
}

bootstrap();
