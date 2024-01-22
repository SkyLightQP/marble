import { City, CityPrice } from '@marble/database';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCitiesGroupByPositionQuery } from '@/app/city/queries/get-cities-group-by-position.query';
import { DatabaseService } from '@/infrastructure/database/database.service';

export type GetCitiesGroupByPositionReturn = Record<number, Array<City & { cityPrices: Array<CityPrice> }>>;

@QueryHandler(GetCitiesGroupByPositionQuery)
export class GetCitiesGroupByPositionHandler implements IQueryHandler<GetCitiesGroupByPositionQuery> {
  constructor(private readonly prisma: DatabaseService) {}

  async execute({ args }: GetCitiesGroupByPositionQuery): Promise<GetCitiesGroupByPositionReturn> {
    const data = await this.prisma.city.findMany({
      skip: args?.offset || undefined,
      take: args?.limit || undefined,
      include: {
        cityPrices: true
      }
    });

    return data.reduce((acc, city) => {
      if (!acc[city.position]) {
        acc[city.position] = [];
      }
      acc[city.position].push(city);
      return acc;
    }, {} as GetCitiesGroupByPositionReturn);
  }
}
