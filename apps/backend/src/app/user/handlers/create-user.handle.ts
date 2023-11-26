import { User } from '@marble/database';
import { ConflictException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { hashSync } from 'bcrypt';
import { DatabaseService } from 'infrastructure/database/database.service';
import { ErrorCode } from 'infrastructure/error/error-code';
import { CreateUserCommand } from '../commands/create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly config: ConfigService
  ) {}

  async execute({ args: { id, password, nickname } }: CreateUserCommand): Promise<User> {
    const salt = Number(this.config.get('BCRYPT_SALT'));

    const prevUser = await this.prisma.user.findFirst({
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
      }
    });

    Logger.log({ message: '새로운 유저를 생성했습니다.', uid: result.userId, id: result.id });

    return result;
  }
}
