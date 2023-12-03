import { DatabaseService } from '@infrastructure/database/database.service';
import { User } from '@marble/database';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from '../queries/get-users.query';

type GetUsersReturn = Array<User>;

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly prisma: DatabaseService) {}

  async execute({ args }: GetUsersQuery): Promise<GetUsersReturn> {
    return this.prisma.user.findMany({
      skip: args?.offset || undefined,
      take: args?.limit || undefined
    });
  }
}
