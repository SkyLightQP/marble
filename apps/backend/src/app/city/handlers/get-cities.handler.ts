import { DatabaseService } from '@infrastructure/database/database.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCitiesQuery } from '../queries/get-cities.query';

@QueryHandler(GetCitiesQuery)
export class GetCitiesHandler implements IQueryHandler<GetCitiesQuery> {
  constructor(private readonly prisma: DatabaseService) {}

  async execute({ args }: GetCitiesQuery) {
    return this.prisma.city.findMany({
      skip: args?.offset || undefined,
      take: args?.limit || undefined
    });
  }
}
