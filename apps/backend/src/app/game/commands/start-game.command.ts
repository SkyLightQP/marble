import { ICommand } from '@nestjs/cqrs';

export class StartGameCommand implements ICommand {
  constructor(
    readonly args: {
      readonly roomId: string;
      readonly executor: string;
    }
  ) {}
}
