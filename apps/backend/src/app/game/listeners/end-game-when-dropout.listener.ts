import { Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RedisClientType } from 'redis';
import { DropoutGameEvent } from '@/app/game/events/dropout-game.event';
import { EndedGameEvent } from '@/app/game/events/ended-game.event';
import { DestroyedRoomEvent } from '@/app/room/events/destroyed-room.event';

@EventsHandler(DropoutGameEvent)
export class EndGameWhenDropoutListener implements IEventHandler<DropoutGameEvent> {
  constructor(
    private readonly eventBus: EventBus,
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType
  ) {}

  async handle({ args: { game, room } }: DropoutGameEvent) {
    if (room.players.length <= 0) {
      await this.redis.hDel('room', room.id);
      await this.redis.hDel('game', room.id);
      this.eventBus.publish(new DestroyedRoomEvent({ room }));
      Logger.log({ message: '플레이어가 아무도 없어 게임을 종료하고 방을 삭제합니다.', roomId: room.id });
      return;
    }

    if (game.getPlayersNotDisable().length <= 1) {
      this.eventBus.publish(new EndedGameEvent({ game, room }));
    }
  }
}
