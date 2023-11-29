import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { SignupUserCommand } from '../commands/signup-user.command';
import { UserSignupEvent } from '../events/user-signup.event';

@CommandHandler(SignupUserCommand)
export class SignupUserHandler implements ICommandHandler<SignupUserCommand> {
  constructor(private readonly eventBus: EventBus) {}

  async execute({ args: { id, password, nickname } }: SignupUserCommand) {
    // TODO: Generate the JWT.
    this.eventBus.publish(new UserSignupEvent({ id, password, nickname }));
  }
}
