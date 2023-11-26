import { User } from '@marble/database';
import { NotFoundException } from '@nestjs/common';
import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { DatabaseService } from 'infrastructure/database/database.service';
import { ErrorCode } from 'infrastructure/error/error-code';
import { prismaExclude } from 'infrastructure/utils/database.util';
import { GetUserByUidQuery } from '../queries/get-user-by-uid.query';

@QueryHandler(GetUserByUidQuery)
export class GetUserByUidHandler implements ICommandHandler<GetUserByUidQuery> {
  constructor(readonly prisma: DatabaseService) {}

  async execute({ args: { uid } }: GetUserByUidQuery): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: uid
      },
      select: prismaExclude('User', ['password'])
    });

    if (user === null) {
      throw new NotFoundException(ErrorCode.USER_NOT_FOUND);
    }

    return user;
  }
}
