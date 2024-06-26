import { ErrorCode } from '@marble/common';
import { ConflictException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { hashSync } from 'bcrypt';
import { SignupUserCommand } from '@/app/auth/commands/signup-user.command';
import { AuthTokenService } from '@/app/auth/services/auth-token.service';
import { DatabaseService } from '@/infrastructure/database/database.service';
import { prismaExclude } from '@/infrastructure/utils/database.util';

export interface SignupUserReturn {
  readonly accessToken: string;
  readonly refreshToken: string;
}

@CommandHandler(SignupUserCommand)
export class SignupUserHandler implements ICommandHandler<SignupUserCommand> {
  constructor(
    private readonly config: ConfigService,
    private readonly authTokenService: AuthTokenService,
    private readonly prisma: DatabaseService
  ) {}

  async execute({ args: { id, password, nickname } }: SignupUserCommand): Promise<SignupUserReturn> {
    const salt = Number(this.config.get('BCRYPT_SALT'));

    const prevUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            id
          },
          {
            nickname
          }
        ]
      }
    });

    if (prevUser !== null) {
      throw new ConflictException(ErrorCode.USER_ALREADY_EXISTS);
    }

    const result = await this.prisma.user.create({
      data: {
        id,
        nickname,
        password: hashSync(password, salt)
      },
      select: prismaExclude('User', ['password'])
    });

    Logger.log({ message: '새로운 유저가 가입했습니다.', uid: result.userId, id: result.id });

    const accessToken = this.authTokenService.generateAccessToken({ sub: result.userId, id });
    const refreshToken = await this.authTokenService.generateRefreshToken({ sub: result.userId, id });

    return {
      accessToken,
      refreshToken
    };
  }
}
