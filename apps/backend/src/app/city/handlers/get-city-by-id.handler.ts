import { DatabaseService } from '@infrastructure/database/database.service';
import { ErrorCode } from '@infrastructure/error/error-code';
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCityByIdQuery } from '../queries/get-city-by-id.query';

@QueryHandler(GetCityByIdQuery)
export class GetCityByIdHandler implements IQueryHandler<GetCityByIdQuery> {
  constructor(private readonly prisma: DatabaseService) {}

  async execute({ args: { id } }: GetCityByIdQuery) {
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
