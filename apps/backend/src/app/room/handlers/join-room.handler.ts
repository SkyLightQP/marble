import { ErrorCode } from '@marble/common';
import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { RedisClientType } from 'redis';
import { Player } from '@/app/player/domain/player';
import { JoinRoomCommand } from '@/app/room/commands/join-room.command';
import { Room } from '@/app/room/domain/room';
import { JoinedRoomEvent } from '@/app/room/events/joined-room.event';
import { GetUserByUidQuery } from '@/app/user/queries/get-user-by-uid.query';

export type JoinRoomReturn = Room;

@CommandHandler(JoinRoomCommand)
export class JoinRoomHandler implements ICommandHandler<JoinRoomCommand> {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus
  ) {}

  async execute({ args: { roomId, userId, socketClientId } }: JoinRoomCommand): Promise<JoinRoomReturn> {
    const roomInRedis = await this.redis.hGet('room', roomId);

    if (roomInRedis === null || roomInRedis === undefined) {
      throw new WsException(ErrorCode.ROOM_NOT_FOUND);
    }

    const room = Room.fromJSON(roomInRedis);

    if (room.isPlaying) {
      throw new WsException(ErrorCode.ROOM_IS_PLAYING);
    }

    const user = await this.queryBus.execute(new GetUserByUidQuery({ uid: userId }));
    const player = Player.create(user.userId, user.id, user.nickname, socketClientId);
    room.addPlayer(player);
    await room.syncRedis(this.redis);
    this.eventBus.publish(new JoinedRoomEvent({ room, userId }));
    Logger.log({ message: '방에 플레이어가 입장했습니다.', room, userId });

    return room;
  }
}
