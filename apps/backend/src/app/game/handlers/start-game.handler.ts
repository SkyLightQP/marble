import { ErrorCode } from '@marble/common';
import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { RedisClientType } from 'redis';
import { StartGameCommand } from '@/app/game/commands/start-game.command';
import { Game, GameFields } from '@/app/game/domain/game';
import { StartedGameEvent } from '@/app/game/events/started-game.event';
import { Room } from '@/app/room/domain/room';
import { GetRoomReturn } from '@/app/room/handlers/get-room.handler';
import { GetRoomQuery } from '@/app/room/queries/get-room.query';

export type StartGameReturn = GameFields;

@CommandHandler(StartGameCommand)
export class StartGameHandler implements ICommandHandler<StartGameCommand> {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus
  ) {}

  async execute({ args: { roomId, executor } }: StartGameCommand): Promise<StartGameReturn> {
    const room = await this.queryBus.execute<GetRoomQuery, GetRoomReturn>(new GetRoomQuery({ roomId }));

    if (room.owner !== executor) {
      throw new WsException(ErrorCode.IS_NOT_OWNER);
    }
    if (room.isPlaying) {
      throw new WsException(ErrorCode.ROOM_IS_PLAYING);
    }
    if (room.players.filter((player) => !player.isReady).length !== 0) {
      throw new WsException(ErrorCode.NOT_ALL_READY);
    }

    const game = Game.create(room.id, room.players);
    this.resetReadyState(room);
    room.isPlaying = true;

    await room.syncRedis(this.redis);
    await game.syncRedis(this.redis);

    this.eventBus.publish(new StartedGameEvent({ room, game }));

    Logger.log({ message: '게임을 시작했습니다.', roomId, executor });

    return game.toJSON();
  }

  private resetReadyState(room: Room) {
    room.players.forEach((player) => {
      // eslint-disable-next-line no-param-reassign
      player.isReady = false;
    });
    // eslint-disable-next-line no-param-reassign
    room.players.find((player) => player.userId === room.owner)!.isReady = true;
  }
}
