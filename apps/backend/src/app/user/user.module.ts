import { Module } from '@nestjs/common';
import { DatabaseModule } from 'infrastructure/database/database.module';
import { UserController } from './controllers/user.controller';
import { CreateUserHandler } from './handlers/create-user.handle';
import { GetUserByUidHandler } from './handlers/get-user-by-uid.handler';
import { GetUsersHandler } from './handlers/get-users.handler';

const commands = [CreateUserHandler];
const queries = [GetUserByUidHandler, GetUsersHandler];

@Module({
  imports: [DatabaseModule],
  providers: [...commands, ...queries],
  controllers: [UserController]
})
export class UserModule {}
