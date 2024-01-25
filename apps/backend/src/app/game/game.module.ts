import { Module } from '@nestjs/common';
import { GameGateway } from '@/app/game/gateways/game.gateway';
import { GetGameHandler } from '@/app/game/handlers/get-game.handler';
import { StartGameHandler } from '@/app/game/handlers/start-game.handler';
import { SocketModule } from '@/app/socket/socket.module';
import { DatabaseModule } from '@/infrastructure/database/database.module';
import { RedisModule } from '@/infrastructure/redis/redis.module';

const commands = [StartGameHandler];
const queries = [GetGameHandler];
const listeners = [];
const gateways = [GameGateway];

@Module({
  imports: [DatabaseModule, RedisModule, SocketModule],
  providers: [...commands, ...queries, ...listeners, ...gateways],
  controllers: []
})
export class GameModule {}
