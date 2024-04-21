import { IEvent } from '@nestjs/cqrs';
import { Player } from '@/app/player/domain/player';
import { Room } from '@/app/room/domain/room';

export class UpdatedReadyEvent implements IEvent {
  constructor(
    readonly args: {
      readonly room: Room;
      readonly player: Player;
    }
  ) {}
}
