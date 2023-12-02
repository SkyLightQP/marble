import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { winstonLoggerConfig } from 'infrastructure/utils/logger.util';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './infrastructure/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLoggerConfig
  });
  const config = app.get<ConfigService>(ConfigService);
  const corsOrigins = JSON.stringify(config.get<string>('CORS_ORIGINS', '[]'));

  app.use(helmet());
  app.enableCors({
    credentials: true,
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD']
  });
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  await app.listen(8080);
}
bootstrap();
