import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { RedisClientType } from 'redis';
import { Room } from '@/app/room/domain/room';
import { GetRoomQuery } from '@/app/room/queries/get-room.query';
import { ErrorCode } from '@/infrastructure/error/error-code';

export type GetRoomReturn = Room;

@QueryHandler(GetRoomQuery)
export class GetRoomHandler implements IQueryHandler<GetRoomQuery> {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: RedisClientType) {}

  async execute({ args: { roomId } }: GetRoomQuery): Promise<GetRoomReturn> {
    const roomsInRedis = await this.redis.hGet('room', roomId);

    if (roomsInRedis === undefined) {
      throw new WsException(ErrorCode.ROOM_NOT_FOUND);
    }

    return Room.fromJSON(roomsInRedis);
  }
}
