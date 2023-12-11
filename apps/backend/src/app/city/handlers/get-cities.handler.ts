import { DatabaseService } from '@infrastructure/database/database.service';
import { City, CityPrice } from '@marble/database';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCitiesQuery } from '../queries/get-cities.query';

export type GetCitiesReturn = Array<City & { cityPrices: Array<CityPrice> }>;

@QueryHandler(GetCitiesQuery)
export class GetCitiesHandler implements IQueryHandler<GetCitiesQuery> {
  constructor(private readonly prisma: DatabaseService) {}

  async execute({ args }: GetCitiesQuery): Promise<GetCitiesReturn> {
    return this.prisma.city.findMany({
      skip: args?.offset || undefined,
      take: args?.limit || undefined,
      include: {
        cityPrices: true
      }
    });
  }
}
