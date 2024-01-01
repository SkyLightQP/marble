import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { RedisClientType } from 'redis';
import { Player } from '@/app/player/domain/player';
import { JoinRoomCommand } from '@/app/room/commands/join-room.command';
import { Room } from '@/app/room/domain/room';
import { GetUserByUidQuery } from '@/app/user/queries/get-user-by-uid.query';
import { ErrorCode } from '@/infrastructure/error/error-code';

export type JoinRoomReturn = Room;

@CommandHandler(JoinRoomCommand)
export class JoinRoomHandler implements ICommandHandler<JoinRoomCommand> {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType,
    private readonly queryBus: QueryBus
  ) {}

  async execute({ args: { roomId, userId } }: JoinRoomCommand): Promise<JoinRoomReturn> {
    const roomInRedis = await this.redis.hGet('room', roomId);

    if (roomInRedis === null || roomInRedis === undefined) {
      throw new WsException(ErrorCode.ROOM_NOT_FOUND);
    }

    const room = Room.fromJSON(roomInRedis);
    const user = await this.queryBus.execute(new GetUserByUidQuery({ uid: userId }));
    const player = Player.create(user.userId, user.id, user.nickname);
    room.addPlayers(player);
    await room.syncRedis(this.redis);
    Logger.log({ message: '방에 플레이어가 입장했습니다.', room, userId });

    return room;
  }
}
