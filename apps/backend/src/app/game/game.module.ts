import { Module } from '@nestjs/common';
import { SocketModule } from '@/app/socket/socket.module';
import { DatabaseModule } from '@/infrastructure/database/database.module';
import { RedisModule } from '@/infrastructure/redis/redis.module';
@Module({
  imports: [DatabaseModule, RedisModule, SocketModule],
})
export class GameModule {}
