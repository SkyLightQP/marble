import { CreateRoomCommand } from '@app/room/commands/create-room.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RedisClientType } from 'redis';
import { Room } from '@app/room/domain/room';
import { Inject, Logger } from '@nestjs/common';

export type CreateRoomReturn = Room;

@CommandHandler(CreateRoomCommand)
export class CreateRoomHandler implements ICommandHandler<CreateRoomCommand> {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: RedisClientType) {}

  async execute({ args: { userId, name, maxPlayer } }): Promise<CreateRoomReturn> {
    const room = Room.create(name, userId, maxPlayer);
    await room.syncRedis(this.redis);
    Logger.log({ message: '새로운 방이 생성되었습니다.', room, userId });
    return room;
  }
}
