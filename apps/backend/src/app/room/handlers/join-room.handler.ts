import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RedisClientType } from 'redis';
import { JoinRoomCommand } from '../commands/join-room.command';
import { Room } from '../domain/room';

export type JoinRoomReturn = Room;

@CommandHandler(JoinRoomCommand)
export class JoinRoomHandler implements ICommandHandler<JoinRoomCommand> {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: RedisClientType) {}

  async execute({ args: { roomId, userId } }: JoinRoomCommand): Promise<JoinRoomReturn> {
    const roomInRedis = await this.redis.hGet('room', roomId);

    if (roomInRedis === null || roomInRedis === undefined) {
      const roomName = `${Math.floor(Math.random() * 1000)}번 방`;
      const room = Room.create(roomName, userId);
      await room.syncRedis(this.redis);
      Logger.log({ message: '새로운 방을 만들었습니다.', room });
      return room;
    }

    const room = Room.fromJSON(roomInRedis);
    room.addPlayers(userId);
    await room.syncRedis(this.redis);
    Logger.log({ message: '방에 플레이어가 입장했습니다.', room, userId });

    return room;
  }
}
