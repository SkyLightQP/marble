import { Module } from '@nestjs/common';
import { CityController } from '@/app/city/controllers/city.controller';
import { CreateCityHandler } from '@/app/city/handlers/create-city.handler';
import { GetCitiesHandler } from '@/app/city/handlers/get-cities.handler';
import { GetCityByIdHandler } from '@/app/city/handlers/get-city-by-id.handler';
import { DatabaseModule } from '@/infrastructure/database/database.module';

const commands = [CreateCityHandler];
const queries = [GetCitiesHandler, GetCityByIdHandler];

@Module({
  imports: [DatabaseModule],
  providers: [...commands, ...queries],
  controllers: [CityController]
})
export class CityModule {}
