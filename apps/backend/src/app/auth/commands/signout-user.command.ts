import { ICommand } from '@nestjs/cqrs';

export class SignoutUserCommand implements ICommand {
  constructor(
    readonly args: {
      readonly refreshToken: string;
    }
  ) {}
}
