import { ErrorCode } from '@marble/common';
import { City, CityPrice } from '@marble/database';
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCityByIdQuery } from '@/app/city/queries/get-city-by-id.query';
import { DatabaseService } from '@/infrastructure/database/database.service';

export type GetCityByIdReturn = City & { cityPrices: Array<CityPrice> };

@QueryHandler(GetCityByIdQuery)
export class GetCityByIdHandler implements IQueryHandler<GetCityByIdQuery> {
  constructor(private readonly prisma: DatabaseService) {}

  async execute({ args: { id } }: GetCityByIdQuery): Promise<GetCityByIdReturn> {
    const city = await this.prisma.city.findUnique({
      where: {
        id
      },
      include: {
        cityPrices: true
      }
    });

    if (city === null) throw new NotFoundException(ErrorCode.CITY_NOT_FOUND);

    return city;
  }
}
