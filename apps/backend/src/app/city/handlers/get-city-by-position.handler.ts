import { City, CityPrice } from '@marble/database';
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCityByPositionQuery } from '@/app/city/queries/get-city-by-position.query';
import { DatabaseService } from '@/infrastructure/database/database.service';
import { ErrorCode } from '@/infrastructure/error/error-code';

export type GetCityByPositionReturn = City & { cityPrices: Array<CityPrice> };

@QueryHandler(GetCityByPositionQuery)
export class GetCityByPositionHandler implements IQueryHandler<GetCityByPositionQuery> {
  constructor(private readonly prisma: DatabaseService) {}

  async execute({ args: { position } }: GetCityByPositionQuery): Promise<GetCityByPositionReturn> {
    const city = await this.prisma.city.findFirst({
      where: {
        position
      },
      include: {
        cityPrices: true
      }
    });

    if (city === null) throw new NotFoundException(ErrorCode.CITY_NOT_FOUND);

    return city;
  }
}
