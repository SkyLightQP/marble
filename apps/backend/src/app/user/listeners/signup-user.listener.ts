import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserSignupEvent } from 'app/auth/events/user-signup.event';
import { CreateUserCommand } from '../commands/create-user.command';

@EventsHandler(UserSignupEvent)
export class SignupUserListener implements IEventHandler<UserSignupEvent> {
  constructor(private readonly commandBus: CommandBus) {}

  handle({ args: { id, password, nickname } }: UserSignupEvent) {
    this.commandBus.execute(new CreateUserCommand({ id, password, nickname }));
  }
}
