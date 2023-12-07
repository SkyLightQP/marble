import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCityCommand } from '../commands/create-city.command';
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
  async createCity(@Body() body: CreateCityDto) {
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
  async getCityById(@Param('id') id: number) {
    return this.queryBus.execute(new GetCityByIdQuery({ id }));
  }

  @Get()
  async getCities() {
    return this.queryBus.execute(new GetCitiesQuery({}));
  }
}
