import { Module } from '@nestjs/common';
import { DatabaseModule } from 'infrastructure/database/database.module';
import { UserController } from './controllers/user.controller';
import { CreateUserHandler } from './handlers/create-user.handle';

@Module({
  imports: [DatabaseModule],
  providers: [CreateUserHandler],
  controllers: [UserController]
})
export class UserModule {}
