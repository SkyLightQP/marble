import { DatabaseService } from '@infrastructure/database/database.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCityByIdQuery } from '../queries/get-city-by-id.query';

@QueryHandler(GetCityByIdQuery)
export class GetCityByIdHandler implements IQueryHandler<GetCityByIdQuery> {
  constructor(private readonly prisma: DatabaseService) {}

  async execute({ args: { id } }: GetCityByIdQuery) {
    return this.prisma.city.findUnique({
      where: {
        id
      },
      include: {
        cityPrices: true
      }
    });
  }
}
