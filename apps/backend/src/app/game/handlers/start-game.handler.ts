import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { RedisClientType } from 'redis';
import { StartGameCommand } from '@/app/game/commands/start-game.command';
import { Game, GameFields } from '@/app/game/domain/game';
import { GetRoomReturn } from '@/app/room/handlers/get-room.handler';
import { GetRoomQuery } from '@/app/room/queries/get-room.query';
import { ErrorCode } from '@/infrastructure/error/error-code';

export type StartGameReturn = GameFields;

@CommandHandler(StartGameCommand)
export class StartGameHandler implements ICommandHandler<StartGameCommand> {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType,
    private readonly queryBus: QueryBus
  ) {}

  async execute({ args: { roomId, executor } }: StartGameCommand): Promise<StartGameReturn> {
    const room = await this.queryBus.execute<GetRoomQuery, GetRoomReturn>(new GetRoomQuery({ roomId }));

    if (room.owner !== executor) {
      throw new WsException(ErrorCode.IS_NOT_OWNER);
    }
    if (room.isPlaying) {
      throw new WsException(ErrorCode.ROOM_IS_PLAYING);
    }

    const game = Game.create(
      room.id,
      room.players.map(({ userId }) => userId)
    );
    room.isPlaying = true;

    await room.syncRedis(this.redis);
    await game.syncRedis(this.redis);

    Logger.log({ message: '게임을 시작했습니다.', roomId, executor });

    return game.toJSON();
  }
}
