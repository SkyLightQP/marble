import { Module } from '@nestjs/common';
import { DatabaseModule } from 'infrastructure/database/database.module';
import { UserController } from './controllers/user.controller';
import { CreateUserHandler } from './handlers/create-user.handle';
import { GetUserByUidHandler } from './handlers/get-user-by-uid.handler';

@Module({
  imports: [DatabaseModule],
  providers: [CreateUserHandler, GetUserByUidHandler],
  controllers: [UserController]
})
export class UserModule {}
