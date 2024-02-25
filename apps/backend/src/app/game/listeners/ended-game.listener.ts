import { Inject, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RedisClientType } from 'redis';
import { EndedGameEvent } from '@/app/game/events/ended-game.event';

@EventsHandler(EndedGameEvent)
export class EndedGameListener implements IEventHandler<EndedGameEvent> {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: RedisClientType) {}

  async handle({ args: { room } }: EndedGameEvent) {
    await this.redis.hDel('game', room.id);
    // eslint-disable-next-line no-param-reassign
    room.isPlaying = false;
    await room.syncRedis(this.redis);

    Logger.log({ message: '게임이 종료되었습니다.', room: room.id });
  }
}
