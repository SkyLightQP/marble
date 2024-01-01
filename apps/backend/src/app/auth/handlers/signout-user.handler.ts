import { ForbiddenException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DatabaseService } from '@/infrastructure/database/database.service';
import { ErrorCode } from '@/infrastructure/error/error-code';
import { SignoutUserCommand } from '@/app/auth/commands/signout-user.command';

@CommandHandler(SignoutUserCommand)
export class SignoutUserHandler implements ICommandHandler<SignoutUserCommand> {
  constructor(private readonly prisma: DatabaseService) {}

  async execute({ args: { refreshToken } }: SignoutUserCommand): Promise<void> {
    const { count } = await this.prisma.refreshTokenWhiteList.deleteMany({
      where: {
        token: refreshToken
      }
    });
    if (count <= 0) throw new ForbiddenException(ErrorCode.PERMISSION_DENIED);
    Logger.log({ message: '유저가 로그아웃 되었습니다.' });
  }
}
