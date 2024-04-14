import { ErrorCode } from '@marble/common';
import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { RedisClientType } from 'redis';
import { EndTurnCommand } from '@/app/game/commands/end-turn.command';
import { EndedTurnEvent } from '@/app/game/events/ended-turn.event';
import { GetGameReturn } from '@/app/game/handlers/get-game.handler';
import { GetGameQuery } from '@/app/game/queries/get-game.query';

@CommandHandler(EndTurnCommand)
export class EndTurnHandler implements ICommandHandler<EndTurnCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType
  ) {}

  async execute({ args: { roomId, executor } }: EndTurnCommand) {
    const game = await this.queryBus.execute<GetGameQuery, GetGameReturn>(new GetGameQuery({ roomId }));

    if (game.playerOrder[game.currentOrderPlayerIndex].userId !== executor) {
      throw new WsException(ErrorCode.PLAYER_IS_NOT_TURN);
    }

    game.increaseCurrentOrderPlayerIndex();
    await game.syncRedis(this.redis);

    this.eventBus.publish(new EndedTurnEvent({ game }));

    Logger.log({ message: '턴을 종료했습니다.', roomId, executor });
  }
}
