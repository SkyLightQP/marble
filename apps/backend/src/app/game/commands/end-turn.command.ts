import { ICommand } from '@nestjs/cqrs';

export class EndTurnCommand implements ICommand {
  constructor(
    readonly args: {
      readonly roomId: string;
      readonly executor: string;
    }
  ) {}
}
