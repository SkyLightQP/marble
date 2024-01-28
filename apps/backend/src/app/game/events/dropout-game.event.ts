import { IEvent } from '@nestjs/cqrs';
import { Room } from '@/app/room/domain/room';

export class DropoutGameEvent implements IEvent {
  constructor(
    readonly args: {
      readonly userId: string;
      readonly room: Room;
    }
  ) {}
}
