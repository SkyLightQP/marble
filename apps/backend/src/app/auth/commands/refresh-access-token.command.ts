import { ICommand } from '@nestjs/cqrs';

export class RefreshAccessTokenCommand implements ICommand {
  constructor(
    readonly args: {
      readonly refreshToken: string;
    }
  ) {}
}
