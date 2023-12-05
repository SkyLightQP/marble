import { DatabaseModule } from '@infrastructure/database/database.module';
import { Module } from '@nestjs/common';

const commands = [];
const queries = [];

@Module({
  imports: [DatabaseModule],
  providers: [...commands, ...queries],
  controllers: []
})
export class CityModule {}
