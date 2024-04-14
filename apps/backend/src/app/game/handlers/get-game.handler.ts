import { ErrorCode } from '@marble/common';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { RedisClientType } from 'redis';
import { Game } from '@/app/game/domain/game';
import { GetGameQuery } from '@/app/game/queries/get-game.query';

export type GetGameReturn = Game;

@QueryHandler(GetGameQuery)
export class GetGameHandler implements IQueryHandler<GetGameQuery> {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: RedisClientType) {}

  async execute({ args: { roomId } }: GetGameQuery): Promise<GetGameReturn> {
    const gameInRedis = await this.redis.hGet('game', roomId);

    if (gameInRedis === undefined || gameInRedis === null) {
      throw new WsException(ErrorCode.ROOM_NOT_FOUND);
    }

    return Game.fromJSON(gameInRedis);
  }
}
