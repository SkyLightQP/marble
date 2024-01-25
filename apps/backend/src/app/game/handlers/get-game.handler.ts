import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { RedisClientType } from 'redis';
import { Game } from '@/app/game/domain/game';
import { GetGameQuery } from '@/app/game/queries/get-game.query';
import { ErrorCode } from '@/infrastructure/error/error-code';

@QueryHandler(GetGameQuery)
export class GetGameHandler implements IQueryHandler<GetGameQuery> {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: RedisClientType) {}

  async execute({ args: { roomId } }: GetGameQuery) {
    const gameInRedis = await this.redis.hGet('game', roomId);

    if (gameInRedis === undefined) {
      throw new WsException(ErrorCode.ROOM_NOT_FOUND);
    }

    return Game.fromJSON(gameInRedis);
  }
}
