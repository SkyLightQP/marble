import { Module } from '@nestjs/common';
import { DatabaseModule } from 'infrastructure/database/database.module';
import { SignupUserHandler } from './handlers/signup-user.handler';

const commands = [SignupUserHandler];
const queries = [];

@Module({
  imports: [DatabaseModule],
  providers: [...commands, ...queries],
  controllers: []
})
export class AuthModule {}
