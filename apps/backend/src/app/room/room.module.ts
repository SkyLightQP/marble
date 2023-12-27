import { DatabaseModule } from '@infrastructure/database/database.module';
import { RedisModule } from '@infrastructure/redis/redis.module';
import { Module } from '@nestjs/common';
import { CreateRoomHandler } from './handlers/create-room.handler';
import { RoomGateway } from './gateways/room.gateway';
import { GetRoomsHandler } from './handlers/get-rooms.handler';
import { JoinRoomHandler } from './handlers/join-room.handler';
import { QuitRoomHandler } from './handlers/quit-room.handler';

const commands = [JoinRoomHandler, QuitRoomHandler, CreateRoomHandler];
const queries = [GetRoomsHandler];
const gateways = [RoomGateway];

@Module({
  imports: [DatabaseModule, RedisModule],
  providers: [...commands, ...queries, ...gateways],
  controllers: []
})
export class RoomModule {}
