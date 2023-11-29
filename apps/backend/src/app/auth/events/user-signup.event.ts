import { IEvent } from '@nestjs/cqrs';

export class UserSignupEvent implements IEvent {
  constructor(
    readonly args: {
      readonly id: string;
      readonly password: string;
      readonly nickname: string;
    }
  ) {}
}
