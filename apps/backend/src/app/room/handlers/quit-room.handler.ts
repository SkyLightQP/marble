import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { RedisClientType } from 'redis';
import { QuitRoomCommand } from '@/app/room/commands/quit-room.command';
import { Room } from '@/app/room/domain/room';
import { DestroyedRoomEvent } from '@/app/room/events/destroyed-room.event';
import { QuitRoomEvent } from '@/app/room/events/quit-room.event';
import { ErrorCode } from '@/infrastructure/error/error-code';

export type QuitRoomReturn = Room;

@CommandHandler(QuitRoomCommand)
export class QuitRoomHandler implements ICommandHandler<QuitRoomCommand> {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType,
    private readonly eventBus: EventBus
  ) {}

  async execute({ args: { roomId, userId } }: QuitRoomCommand): Promise<QuitRoomReturn> {
    const roomInRedis = await this.redis.hGet('room', roomId);

    if (roomInRedis === null || roomInRedis === undefined) {
      throw new WsException(ErrorCode.ROOM_NOT_FOUND);
    }

    const room = Room.fromJSON(roomInRedis);

    if (room.isPlaying) return room;

    room.removePlayer(userId);
    await room.syncRedis(this.redis);
    this.eventBus.publish(new QuitRoomEvent({ room, userId }));
    Logger.log({ message: '방에서 플레이어가 퇴장했습니다.', room, userId });

    if (room.players.length <= 0) {
      await this.redis.hDel('room', roomId);
      this.eventBus.publish(new DestroyedRoomEvent({ room }));
      Logger.log({ message: '플레이어가 아무도 없어 방이 삭제되었습니다.', roomId });
      return room;
    }

    return room;
  }
}
