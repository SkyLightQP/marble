import { Module } from '@nestjs/common';
import { UserController } from '@/app/user/controllers/user.controller';
import { GetUserByUidHandler } from '@/app/user/handlers/get-user-by-uid.handler';
import { GetUsersHandler } from '@/app/user/handlers/get-users.handler';
import { DatabaseModule } from '@/infrastructure/database/database.module';

const commands = [];
const queries = [GetUserByUidHandler, GetUsersHandler];

@Module({
  imports: [DatabaseModule],
  providers: [...commands, ...queries],
  controllers: [UserController]
})
export class UserModule {}
