import { IEvent } from '@nestjs/cqrs';
import { Game } from '@/app/game/domain/game';

export class EndedTurnEvent implements IEvent {
  constructor(
    readonly args: {
      readonly game: Game;
    }
  ) {}
}
