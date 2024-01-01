import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RedisClientType } from 'redis';
import { Room } from '@/app/room/domain/room';
import { GetRoomsQuery } from '@/app/room/queries/get-rooms.query';

export type GetRoomsReturn = Room[];

@QueryHandler(GetRoomsQuery)
export class GetRoomsHandler implements IQueryHandler<GetRoomsQuery> {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: RedisClientType) {}

  async execute(): Promise<GetRoomsReturn> {
    const roomsInRedis = await this.redis.hGetAll('room');
    return Object.values(roomsInRedis).map((roomInRedis) => Room.fromJSON(roomInRedis));
  }
}
