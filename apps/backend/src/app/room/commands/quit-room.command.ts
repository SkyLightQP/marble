import { ICommand } from '@nestjs/cqrs';

export class QuitRoomCommand implements ICommand {
  constructor(
    readonly args: {
      readonly roomId: string;
      readonly userId: string;
    }
  ) {}
}
