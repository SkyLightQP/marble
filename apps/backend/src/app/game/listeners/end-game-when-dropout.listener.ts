import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DropoutGameEvent } from '@/app/game/events/dropout-game.event';
import { EndedGameEvent } from '@/app/game/events/ended-game.event';

@EventsHandler(DropoutGameEvent)
export class EndGameWhenDropoutListener implements IEventHandler<DropoutGameEvent> {
  constructor(private readonly eventBus: EventBus) {}

  handle({ args: { game, room } }: DropoutGameEvent) {
    if (game.getPlayersNotDisable().length <= 1) {
      this.eventBus.publish(new EndedGameEvent({ game, room }));
    }
  }
}
