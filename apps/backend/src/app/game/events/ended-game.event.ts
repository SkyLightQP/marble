import { IEvent } from '@nestjs/cqrs';
import { Game } from '@/app/game/domain/game';

export class EndedGameEvent implements IEvent {
  constructor(
    readonly args: {
      readonly game: Game;
    }
  ) {}
}
