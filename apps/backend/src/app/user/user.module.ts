import { Module } from '@nestjs/common';
import { DatabaseModule } from 'infrastructure/database/database.module';
import { CreateUserHandler } from './handlers/create-user.handler';
import { GetUserByUidHandler } from './handlers/get-user-by-uid.handler';
import { GetUsersHandler } from './handlers/get-users.handler';
import { SignupUserListener } from './listeners/signup-user.listener';

const commands = [CreateUserHandler];
const queries = [GetUserByUidHandler, GetUsersHandler];
const listeners = [SignupUserListener];

@Module({
  imports: [DatabaseModule],
  providers: [...commands, ...queries, ...listeners],
  controllers: []
})
export class UserModule {}
