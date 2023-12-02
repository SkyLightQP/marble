import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DatabaseService } from 'infrastructure/database/database.service';
import { SignupUserCommand } from '../commands/signup-user.command';
import { AuthTokenService } from '../services/auth-token.service';

@CommandHandler(SignupUserCommand)
export class SignupUserHandler implements ICommandHandler<SignupUserCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly authTokenService: AuthTokenService,
    private readonly prisma: DatabaseService
  ) {}

  async execute({ args: { id, password, nickname } }: SignupUserCommand) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    const accessToken = this.authTokenService.generateAccessToken(user.userId, { id });
    const refreshToken = this.authTokenService.generateRefreshToken(user.userId, { id });

    return {
      accessToken,
      refreshToken
    };
  }
}
