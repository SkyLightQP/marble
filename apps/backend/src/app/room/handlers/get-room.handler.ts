import { ErrorCode } from '@marble/common';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { RedisClientType } from 'redis';
import { Room } from '@/app/room/domain/room';
import { GetRoomQuery } from '@/app/room/queries/get-room.query';

export type GetRoomReturn = Room;

@QueryHandler(GetRoomQuery)
export class GetRoomHandler implements IQueryHandler<GetRoomQuery> {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: RedisClientType) {}

  async execute({ args: { roomId } }: GetRoomQuery): Promise<GetRoomReturn> {
    const roomsInRedis = await this.redis.hGet('room', roomId);

    if (roomsInRedis === undefined || roomsInRedis === null) {
      throw new WsException(ErrorCode.ROOM_NOT_FOUND);
    }

    return Room.fromJSON(roomsInRedis);
  }
}
