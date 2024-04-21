import { ICommand } from '@nestjs/cqrs';

export class ToggleReadyCommand implements ICommand {
  constructor(
    readonly args: {
      readonly roomId: string;
      readonly userId: string;
    }
  ) {}
}
