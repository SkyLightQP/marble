import { Module } from '@nestjs/common';
import { RoomGateway } from '@/app/room/gateways/room.gateway';
import { CreateRoomHandler } from '@/app/room/handlers/create-room.handler';
import { GetRoomHandler } from '@/app/room/handlers/get-room.handler';
import { GetRoomsHandler } from '@/app/room/handlers/get-rooms.handler';
import { JoinRoomHandler } from '@/app/room/handlers/join-room.handler';
import { QuitRoomHandler } from '@/app/room/handlers/quit-room.handler';
import { RefreshRoomListener } from '@/app/room/listeners/refresh-room.listener';
import { SocketModule } from '@/app/socket/socket.module';
import { DatabaseModule } from '@/infrastructure/database/database.module';
import { RedisModule } from '@/infrastructure/redis/redis.module';

const commands = [JoinRoomHandler, QuitRoomHandler, CreateRoomHandler];
const queries = [GetRoomsHandler, GetRoomHandler];
const listeners = [RefreshRoomListener];
const gateways = [RoomGateway];

@Module({
  imports: [DatabaseModule, RedisModule, SocketModule],
  providers: [...commands, ...queries, ...listeners, ...gateways],
  controllers: []
})
export class RoomModule {}
