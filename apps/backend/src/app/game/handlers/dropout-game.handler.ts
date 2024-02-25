import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { RedisClientType } from 'redis';
import { DropoutGameCommand } from '@/app/game/commands/dropout-game.command';
import { DropoutGameEvent } from '@/app/game/events/dropout-game.event';
import { GetGameReturn } from '@/app/game/handlers/get-game.handler';
import { GetGameQuery } from '@/app/game/queries/get-game.query';
import { Room } from '@/app/room/domain/room';
import { DestroyedRoomEvent } from '@/app/room/events/destroyed-room.event';
import { GetRoomReturn } from '@/app/room/handlers/get-room.handler';
import { GetRoomQuery } from '@/app/room/queries/get-room.query';

export type DropoutGameReturn = Room;

@CommandHandler(DropoutGameCommand)
export class DropoutGameHandler implements ICommandHandler<DropoutGameCommand> {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus
  ) {}

  async execute({ args: { roomId, userId } }: DropoutGameCommand): Promise<DropoutGameReturn> {
    const room = await this.queryBus.execute<GetRoomQuery, GetRoomReturn>(new GetRoomQuery({ roomId }));
    const game = await this.queryBus.execute<GetGameQuery, GetGameReturn>(new GetGameQuery({ roomId }));

    room.removePlayer(userId);
    game.removePlayer(userId);

    if (room.players.length > 1) game.increaseCurrentOrderPlayerIndex();
    await room.syncRedis(this.redis);
    await game.syncRedis(this.redis);

    this.eventBus.publish(new DropoutGameEvent({ userId, room, game }));

    Logger.log({ message: '플레이어가 중퇴했습니다.', room, userId });

    if (room.players.length <= 0) {
      await this.redis.hDel('room', roomId);
      await this.redis.hDel('game', roomId);
      this.eventBus.publish(new DestroyedRoomEvent({ room }));
      Logger.log({ message: '플레이어가 아무도 없어 게임을 종료하고 방을 삭제합니다.', roomId });
      return room;
    }

    return room;
  }
}
