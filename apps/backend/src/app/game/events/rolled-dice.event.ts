import { IEvent } from '@nestjs/cqrs';
import { Game } from '@/app/game/domain/game';

export class RolledDiceEvent implements IEvent {
  constructor(
    readonly args: {
      readonly game: Game;
      readonly position: number;
      readonly executor: string;
    }
  ) {}
}
