import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

export const REDIS_PROVIDER = [
  {
    provide: 'REDIS_CLIENT',
    useFactory: async (config: ConfigService) => {
      const host = config.get<string>('REDIS_HOST', 'localhost');
      const port = config.get<number>('REDIS_PORT', 6379);
      const password = config.get('REDIS_PASSWORD', undefined);
      const client = createClient({
        url: `redis://${host}:${port}`,
        password
      });
      await client.connect();
      return client;
    },
    inject: [ConfigService]
  }
];
