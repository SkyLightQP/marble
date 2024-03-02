import { ICommand } from '@nestjs/cqrs';

export class UpdateRoomCommand implements ICommand {
  constructor(
    readonly args: {
      readonly roomId: string;
      readonly name: string;
      readonly maxPlayer: number;
      readonly executor: string;
    }
  ) {}
}
