import { ErrorCode } from '@infrastructure/error/error-code';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { RedisClientType } from 'redis';
import { QuitRoomCommand } from '../commands/quit-room.command';
import { Room } from '../domain/room';

export type QuitRoomReturn = Room | null;

@CommandHandler(QuitRoomCommand)
export class QuitRoomHandler implements ICommandHandler<QuitRoomCommand> {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: RedisClientType) {}

  async execute({ args: { roomId, userId } }: QuitRoomCommand): Promise<QuitRoomReturn> {
    const roomInRedis = await this.redis.hGet('room', roomId);

    if (roomInRedis === null || roomInRedis === undefined) {
      throw new WsException(ErrorCode.ROOM_NOT_FOUND);
    }

    const room = Room.fromJSON(roomInRedis);
    room.removePlayers(userId);
    await room.syncRedis(this.redis);

    if (room.players.length <= 0) {
      await this.redis.hDel('room', roomId);
      return null;
    }

    return room;
  }
}
