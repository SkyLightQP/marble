import { AppModule } from '@app.module';
import { ResponseInterceptor } from '@infrastructure/interceptors/response.interceptor';
import { winstonLoggerConfig } from '@infrastructure/utils/logger.util';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLoggerConfig
  });
  const config = app.get<ConfigService>(ConfigService);
  const corsDevOrigin = config.get<string>('CORS_DEVELOPMENT_ORIGIN', '');
  const corsProdOrigin = config.get<string>('CORS_PRODUCTION_ORIGIN', '');

  app.use(helmet());
  app.enableCors({
    credentials: true,
    origin: [corsDevOrigin, corsProdOrigin],
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
  app.use(cookieParser());

  await app.listen(8080);
}
bootstrap();
