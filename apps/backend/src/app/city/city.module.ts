import { DatabaseModule } from '@infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { CityController } from './controllers/city.controller';
import { CreateCityHandler } from './handlers/create-city.handler';
import { GetCitiesHandler } from './handlers/get-cities.handler';
import { GetCityByIdHandler } from './handlers/get-city-by-id.handler';

const commands = [CreateCityHandler];
const queries = [GetCitiesHandler, GetCityByIdHandler];

@Module({
  imports: [DatabaseModule],
  providers: [...commands, ...queries],
  controllers: [CityController]
})
export class CityModule {}
