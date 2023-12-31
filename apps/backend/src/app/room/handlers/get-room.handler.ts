import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RedisClientType } from 'redis';
import { GetRoomQuery } from '@app/room/queries/get-room.query';
import { WsException } from '@nestjs/websockets';
import { ErrorCode } from '@infrastructure/error/error-code';
import { Room } from '../domain/room';

export type GetRoomReturn = Room;

@QueryHandler(GetRoomQuery)
export class GetRoomHandler implements IQueryHandler<GetRoomQuery> {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: RedisClientType) {}

  async execute({ args: { roomId } }: GetRoomQuery): Promise<GetRoomReturn> {
    const roomsInRedis = await this.redis.hGetAll('room');

    if (roomsInRedis[roomId] === undefined) {
      throw new WsException(ErrorCode.ROOM_NOT_FOUND);
    }

    return Room.fromJSON(roomsInRedis[roomId]);
  }
}
