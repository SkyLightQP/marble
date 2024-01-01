import { Module } from '@nestjs/common';
import { REDIS_PROVIDER } from '@/infrastructure/redis/redis.service';

@Module({
  providers: [...REDIS_PROVIDER],
  exports: [...REDIS_PROVIDER]
})
export class RedisModule {}
