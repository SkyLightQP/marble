import { DatabaseService } from '@infrastructure/database/database.service';
import { ErrorCode } from '@infrastructure/error/error-code';
import { City, CityPrice } from '@marble/database';
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCityByIdQuery } from '../queries/get-city-by-id.query';

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
