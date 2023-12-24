import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RedisClientType } from 'redis';
import { JoinRoomCommand } from '../commands/join-room.command';
import { Room } from '../domain/room';

export type JoinRoomReturn = Room;

@CommandHandler(JoinRoomCommand)
export class JoinRoomHandler implements ICommandHandler<JoinRoomCommand> {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: RedisClientType) {}

  async execute({ args: { roomId, userId } }: JoinRoomCommand): Promise<JoinRoomReturn> {
    const roomInRedis = await this.redis.get(roomId);

    if (roomInRedis === null) {
      const roomName = `${Math.floor(Math.random() * 1000)}번 방`;
      const room = Room.create(roomName, userId);
      await room.syncRedis(this.redis);
      return room;
    }

    const room = Room.fromJSON(roomInRedis);
    room.addMember(userId);
    await room.syncRedis(this.redis);

    return room;
  }
}
