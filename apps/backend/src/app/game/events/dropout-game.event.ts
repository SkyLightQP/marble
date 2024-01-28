import { IEvent } from '@nestjs/cqrs';
import { Game } from '@/app/game/domain/game';
import { Room } from '@/app/room/domain/room';

export class DropoutGameEvent implements IEvent {
  constructor(
    readonly args: {
      readonly userId: string;
      readonly room: Room;
      readonly game: Game;
    }
  ) {}
}
