import { ICommand } from '@nestjs/cqrs';

export class RollDiceCommand implements ICommand {
  constructor(
    readonly args: {
      readonly roomId: string;
      readonly executor: string;
    }
  ) {}
}
