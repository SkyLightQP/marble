import { DatabaseModule } from '@infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { UserController } from '@app/user/controllers/user.controller';
import { GetUserByUidHandler } from './handlers/get-user-by-uid.handler';
import { GetUsersHandler } from './handlers/get-users.handler';

const commands = [];
const queries = [GetUserByUidHandler, GetUsersHandler];

@Module({
  imports: [DatabaseModule],
  providers: [...commands, ...queries],
  controllers: [UserController]
})
export class UserModule {}
