import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
  constructor(
    readonly args: {
      readonly id: string;
      readonly password: string;
      readonly nickname: string;
    }
  ) {}
}
