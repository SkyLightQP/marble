import { Module } from '@nestjs/common';
import { GameGateway } from '@/app/game/gateways/game.gateway';
import { BuyCityHandler } from '@/app/game/handlers/buy-city.handler';
import { DropoutGameHandler } from '@/app/game/handlers/dropout-game.handler';
import { EndTurnHandler } from '@/app/game/handlers/end-turn.handler';
import { GetGameHandler } from '@/app/game/handlers/get-game.handler';
import { RollDiceHandler } from '@/app/game/handlers/roll-dice.handler';
import { StartGameHandler } from '@/app/game/handlers/start-game.handler';
import { ArrivedCityListener } from '@/app/game/listeners/arrived-city.listener';
import { SocketModule } from '@/app/socket/socket.module';
import { DatabaseModule } from '@/infrastructure/database/database.module';
import { RedisModule } from '@/infrastructure/redis/redis.module';

const commands = [StartGameHandler, DropoutGameHandler, RollDiceHandler, BuyCityHandler, EndTurnHandler];
const queries = [GetGameHandler];
const gateways = [GameGateway];
const listeners = [ArrivedCityListener];

@Module({
  imports: [DatabaseModule, RedisModule, SocketModule],
  providers: [...commands, ...queries, ...gateways, ...listeners],
  controllers: []
})
export class GameModule {}
