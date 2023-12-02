import { DatabaseService } from '@infrastructure/database/database.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from '../queries/get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly prisma: DatabaseService) {}

  async execute({ args }: GetUsersQuery) {
    return this.prisma.user.findMany({
      skip: args?.offset || undefined,
      take: args?.limit || undefined
    });
  }
}
