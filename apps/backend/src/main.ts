import { NestFactory } from '@nestjs/core';
import { winstonLoggerConfig } from 'infrastructure/utils/logger.util';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './infrastructure/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLoggerConfig
  });

  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(8080);
}
bootstrap();
