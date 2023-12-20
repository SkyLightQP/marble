import { Module } from '@nestjs/common';
import { REDIS_PROVIDER } from './redis.service';

@Module({
  providers: [...REDIS_PROVIDER],
  exports: [...REDIS_PROVIDER]
})
export class RedisModule {}
