import { ErrorCode } from '@marble/common';
import { ForbiddenException, Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RedisClientType } from 'redis';
import { SignoutUserCommand } from '@/app/auth/commands/signout-user.command';

@CommandHandler(SignoutUserCommand)
export class SignoutUserHandler implements ICommandHandler<SignoutUserCommand> {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: RedisClientType) {}

  async execute({ args: { refreshToken } }: SignoutUserCommand): Promise<void> {
    const deleteCount = await this.redis.del(`refreshToken:${refreshToken}`);
    if (deleteCount <= 0) throw new ForbiddenException(ErrorCode.PERMISSION_DENIED);
    Logger.log({ message: '유저가 로그아웃 되었습니다.' });
  }
}
