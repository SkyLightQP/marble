import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCityCommand } from '../commands/create-city.command';
import { CreateCityReturn } from '../handlers/create-city.handler';
import { GetCitiesReturn } from '../handlers/get-cities.handler';
import { GetCityByIdReturn } from '../handlers/get-city-by-id.handler';
import { GetCitiesQuery } from '../queries/get-cities.query';
import { GetCityByIdQuery } from '../queries/get-city-by-id.query';
import { CreateCityDto } from './dto/create-city.dto';

@Controller('city')
export class CityController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async createCity(@Body() body: CreateCityDto): Promise<CreateCityReturn> {
    const command = new CreateCityCommand({
      name: body.name,
      icon: body.icon,
      price: {
        landPrice: body.landPrice,
        housePrice: body.housePrice,
        buildingPrice: body.buildingPrice,
        hotelPrice: body.hotelPrice
      }
    });
    return this.commandBus.execute(command);
  }

  @Get('/:id')
  async getCityById(@Param('id') id: number): Promise<GetCityByIdReturn> {
    return this.queryBus.execute(new GetCityByIdQuery({ id }));
  }

  @Get()
  async getCities(): Promise<GetCitiesReturn> {
    return this.queryBus.execute(new GetCitiesQuery({}));
  }
}
