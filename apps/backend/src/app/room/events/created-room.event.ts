import { IEvent } from '@nestjs/cqrs';
import { Room } from '@/app/room/domain/room';

export class CreatedRoomEvent implements IEvent {
  constructor(
    readonly args: {
      readonly room: Room;
    }
  ) {}
}
