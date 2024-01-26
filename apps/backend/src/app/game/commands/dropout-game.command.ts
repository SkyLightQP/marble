import { ICommand } from '@nestjs/cqrs';

export class DropoutGameCommand implements ICommand {
  constructor(
    readonly args: {
      readonly roomId: string;
      readonly userId: string;
    }
  ) {}
}
