import { ICommand } from '@nestjs/cqrs';

export class SigninUserCommand implements ICommand {
  constructor(
    readonly args: {
      readonly id: string;
      readonly password: string;
    }
  ) {}
}
