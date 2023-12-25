import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RedisClientType } from 'redis';
import { Room } from '../domain/room';
import { GetRoomsQuery } from '../queries/get-rooms.query';

export type GetRoomsReturn = Room[];

@QueryHandler(GetRoomsQuery)
export class GetRoomsHandler implements IQueryHandler<GetRoomsQuery> {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: RedisClientType) {}

  async execute(): Promise<GetRoomsReturn> {
    const roomIds = await this.redis.keys('room:*');
    const rooms = await Promise.all(roomIds.map((roomId) => this.redis.get(roomId)));
    return rooms.filter((room) => room !== null).map((room) => Room.fromJSON(room as string));
  }
}
