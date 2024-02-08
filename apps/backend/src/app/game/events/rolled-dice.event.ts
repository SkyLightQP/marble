import { IEvent } from '@nestjs/cqrs';
import { Game } from '@/app/game/domain/game';
import { Player } from '@/app/player/domain/player';

export class RolledDiceEvent implements IEvent {
  constructor(
    readonly args: {
      readonly game: Game;
      readonly position: number;
      readonly executePlayer: Player;
    }
  ) {}
}
