import { createClient } from 'redis';

export const REDIS_PROVIDER = [
  {
    provide: 'REDIS_CLIENT',
    useFactory: async () => {
      const client = createClient({
        url: 'redis://localhost:6379'
      });
      await client.connect();
      return client;
    }
  }
];
