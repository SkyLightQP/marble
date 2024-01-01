import { Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { compareSync } from 'bcrypt';
import { SigninUserCommand } from '@/app/auth/commands/signin-user.command';
import { AuthTokenService } from '@/app/auth/services/auth-token.service';
import { DatabaseService } from '@/infrastructure/database/database.service';
import { ErrorCode } from '@/infrastructure/error/error-code';

export interface SigninUserReturn {
  readonly accessToken: string;
  readonly refreshToken: string;
}

@CommandHandler(SigninUserCommand)
export class SigninUserHandler implements ICommandHandler<SigninUserCommand> {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly authTokenService: AuthTokenService
  ) {}

  async execute({ args: { id, password } }: SigninUserCommand): Promise<SigninUserReturn> {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    });

    if (user === null) throw new NotFoundException(ErrorCode.USER_NOT_FOUND);

    const isPasswordMatched = compareSync(password, user.password);
    if (!isPasswordMatched) throw new NotFoundException(ErrorCode.USER_NOT_FOUND);

    const accessToken = this.authTokenService.generateAccessToken({ sub: user.userId, id });
    const refreshToken = await this.authTokenService.generateRefreshToken({ sub: user.userId, id });

    Logger.log({ message: '유저가 로그인했습니다.', uid: user.userId, id: user.id });

    return {
      accessToken,
      refreshToken
    };
  }
}
