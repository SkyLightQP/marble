import { ICommand } from '@nestjs/cqrs';

export class JoinRoomCommand implements ICommand {
  constructor(
    readonly args: {
      readonly roomId: string;
      readonly userId: string;
    }
  ) {}
}
