import { Module } from '@nestjs/common';
import { GameGateway } from '@/app/game/gateways/game.gateway';
import { DropoutGameHandler } from '@/app/game/handlers/dropout-game.handler';
import { GetGameHandler } from '@/app/game/handlers/get-game.handler';
import { RollDiceHandler } from '@/app/game/handlers/roll-dice.handler';
import { StartGameHandler } from '@/app/game/handlers/start-game.handler';
import { DatabaseModule } from '@/infrastructure/database/database.module';
import { RedisModule } from '@/infrastructure/redis/redis.module';

const commands = [StartGameHandler, DropoutGameHandler, RollDiceHandler];
const queries = [GetGameHandler];
const gateways = [GameGateway];

@Module({
  imports: [DatabaseModule, RedisModule],
  providers: [...commands, ...queries, ...gateways],
  controllers: []
})
export class GameModule {}
