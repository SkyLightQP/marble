import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { RedisClientType } from 'redis';
import { JoinRoomCommand } from '@/app/room/commands/join-room.command';
import { Room } from '@/app/room/domain/room';
import { ErrorCode } from '@/infrastructure/error/error-code';

export type JoinRoomReturn = Room;

@CommandHandler(JoinRoomCommand)
export class JoinRoomHandler implements ICommandHandler<JoinRoomCommand> {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: RedisClientType) {}

  async execute({ args: { roomId, userId } }: JoinRoomCommand): Promise<JoinRoomReturn> {
    const roomInRedis = await this.redis.hGet('room', roomId);

    if (roomInRedis === null || roomInRedis === undefined) {
      throw new WsException(ErrorCode.ROOM_NOT_FOUND);
    }

    const room = Room.fromJSON(roomInRedis);
    room.addPlayers(userId);
    await room.syncRedis(this.redis);
    Logger.log({ message: '방에 플레이어가 입장했습니다.', room, userId });

    return room;
  }
}
