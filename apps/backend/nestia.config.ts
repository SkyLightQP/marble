import { AppModule } from '@app.module';
import { INestiaConfig } from '@nestia/sdk';
import { NestFactory } from '@nestjs/core';

const NESTIA_CONFIG: INestiaConfig = {
  input: async () => {
    const app = await NestFactory.create(AppModule);
    return app;
  },
  output: './src/api'
};
export default NESTIA_CONFIG;
