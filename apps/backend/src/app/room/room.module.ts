import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infrastructure/database/database.module';
import { RedisModule } from '@/infrastructure/redis/redis.module';
import { GetRoomHandler } from '@/app/room/handlers/get-room.handler';
import { CreateRoomHandler } from '@/app/room/handlers/create-room.handler';
import { RoomGateway } from '@/app/room/gateways/room.gateway';
import { GetRoomsHandler } from '@/app/room/handlers/get-rooms.handler';
import { JoinRoomHandler } from '@/app/room/handlers/join-room.handler';
import { QuitRoomHandler } from '@/app/room/handlers/quit-room.handler';

const commands = [JoinRoomHandler, QuitRoomHandler, CreateRoomHandler];
const queries = [GetRoomsHandler, GetRoomHandler];
const gateways = [RoomGateway];

@Module({
  imports: [DatabaseModule, RedisModule],
  providers: [...commands, ...queries, ...gateways],
  controllers: []
})
export class RoomModule {}
