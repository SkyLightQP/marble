import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { RedisClientType } from 'redis';
import { QuitRoomCommand } from '@/app/room/commands/quit-room.command';
import { Room } from '@/app/room/domain/room';
import { ErrorCode } from '@/infrastructure/error/error-code';

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
    room.removePlayer(userId);
    await room.syncRedis(this.redis);
    Logger.log({ message: '방에서 플레이어가 퇴장했습니다.', room, userId });

    if (room.players.length <= 0) {
      await this.redis.hDel('room', roomId);
      Logger.log({ message: '플레이어가 아무도 없어 방이 삭제되었습니다.', roomId });
      return null;
    }

    return room;
  }
}
