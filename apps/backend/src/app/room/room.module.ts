import { DatabaseModule } from '@infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { RoomGateway } from './gateways/room.gateway';

const commands = [];
const queries = [];
const gateways = [RoomGateway];

@Module({
  imports: [DatabaseModule],
  providers: [...commands, ...queries, ...gateways],
  controllers: []
})
export class RoomModule {}
