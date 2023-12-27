import { ICommand } from '@nestjs/cqrs';

export class CreateRoomCommand implements ICommand {
  constructor(
    readonly args: {
      readonly userId: string;
      readonly name: string;
      readonly maxPlayer: number;
    }
  ) {}
}
