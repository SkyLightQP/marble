import { DatabaseModule } from '@infrastructure/database/database.module';
import { RedisModule } from '@infrastructure/redis/redis.module';
import { Module } from '@nestjs/common';
import { RoomGateway } from './gateways/room.gateway';

const commands = [];
const queries = [];
const gateways = [RoomGateway];

@Module({
  imports: [DatabaseModule, RedisModule],
  providers: [...commands, ...queries, ...gateways],
  controllers: []
})
export class RoomModule {}
