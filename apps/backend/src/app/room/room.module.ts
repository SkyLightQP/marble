import { Module } from '@nestjs/common';
import { RoomGateway } from '@/app/room/gateways/room.gateway';
import { CreateRoomHandler } from '@/app/room/handlers/create-room.handler';
import { GetRoomHandler } from '@/app/room/handlers/get-room.handler';
import { GetRoomsHandler } from '@/app/room/handlers/get-rooms.handler';
import { JoinRoomHandler } from '@/app/room/handlers/join-room.handler';
import { QuitRoomHandler } from '@/app/room/handlers/quit-room.handler';
import { ToggleReadyHandler } from '@/app/room/handlers/toggle-ready.handler';
import { UpdateRoomHandler } from '@/app/room/handlers/update-room.handler';
import { DatabaseModule } from '@/infrastructure/database/database.module';
import { RedisModule } from '@/infrastructure/redis/redis.module';

const commands = [JoinRoomHandler, QuitRoomHandler, CreateRoomHandler, UpdateRoomHandler, ToggleReadyHandler];
const queries = [GetRoomsHandler, GetRoomHandler];
const gateways = [RoomGateway];

@Module({
  imports: [DatabaseModule, RedisModule],
  providers: [...commands, ...queries, ...gateways],
  controllers: []
})
export class RoomModule {}
