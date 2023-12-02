import { ConflictException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { hashSync } from 'bcrypt';
import { DatabaseService } from 'infrastructure/database/database.service';
import { ErrorCode } from 'infrastructure/error/error-code';
import { prismaExclude } from 'infrastructure/utils/database.util';
import { SignupUserCommand } from '../commands/signup-user.command';
import { AuthTokenService } from '../services/auth-token.service';

@CommandHandler(SignupUserCommand)
export class SignupUserHandler implements ICommandHandler<SignupUserCommand> {
  constructor(
    private readonly config: ConfigService,
    private readonly authTokenService: AuthTokenService,
    private readonly prisma: DatabaseService
  ) {}

  async execute({ args: { id, password, nickname } }: SignupUserCommand) {
    const salt = Number(this.config.get('BCRYPT_SALT'));

    const prevUser = await this.prisma.user.findUnique({
      where: {
        id,
        nickname
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

    const accessToken = this.authTokenService.generateAccessToken(result.userId, { id });
    const refreshToken = this.authTokenService.generateRefreshToken(result.userId, { id });

    return {
      accessToken,
      refreshToken
    };
  }
}
