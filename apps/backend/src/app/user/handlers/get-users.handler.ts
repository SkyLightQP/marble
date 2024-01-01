import { User } from '@marble/database';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from '@/app/user/queries/get-users.query';
import { DatabaseService } from '@/infrastructure/database/database.service';

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
