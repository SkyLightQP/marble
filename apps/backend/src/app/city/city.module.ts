import { DatabaseModule } from '@infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { GetCitiesHandler } from './handlers/get-cities.handler';

const commands = [];
const queries = [GetCitiesHandler];

@Module({
  imports: [DatabaseModule],
  providers: [...commands, ...queries],
  controllers: []
})
export class CityModule {}
