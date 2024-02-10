import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { RedisClientType } from 'redis';
import { RollDiceCommand } from '@/app/game/commands/roll-dice.command';
import { GAME_CARD_AMOUNT } from '@/app/game/constants/game-board.constant';
import { RolledDiceEvent } from '@/app/game/events/rolled-dice.event';
import { GetGameReturn } from '@/app/game/handlers/get-game.handler';
import { GetGameQuery } from '@/app/game/queries/get-game.query';
import { ErrorCode } from '@/infrastructure/error/error-code';

export type RollDiceReturn = number[];

@CommandHandler(RollDiceCommand)
export class RollDiceHandler implements ICommandHandler<RollDiceCommand> {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus
  ) {}

  async execute({ args: { roomId, executor } }: RollDiceCommand): Promise<RollDiceReturn> {
    const game = await this.queryBus.execute<GetGameQuery, GetGameReturn>(new GetGameQuery({ roomId }));
    const player = game.playerOrder[game.currentOrderPlayerIndex];

    if (player.userId !== executor) {
      throw new WsException(ErrorCode.PLAYER_IS_NOT_TURN);
    }

    const isLastOrderPlayer = executor === game.playerOrder[game.playerOrder.length - 1].userId;
    if (isLastOrderPlayer) {
      game.turn += 1;
    }

    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;

    // TODO: implement double dice.

    const playerStatus = game.getPlayerStatus(executor);
    const prevPosition = playerStatus.position;
    playerStatus.position = (playerStatus.position + dice1 + dice2) % GAME_CARD_AMOUNT;

    const isPassedStartPoint = prevPosition > playerStatus.position;
    if (isPassedStartPoint) {
      playerStatus.money += 1000;
    }

    await game.syncRedis(this.redis);

    Logger.log({ message: '주사위를 굴렸습니다.', roomId, executor, dice1, dice2 });

    this.eventBus.publish(new RolledDiceEvent({ game, position: playerStatus.position, executePlayer: player }));

    return [dice1, dice2];
  }
}
