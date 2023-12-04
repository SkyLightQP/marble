import { DatabaseModule } from '@infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { RefreshAccessTokenHandler } from './handlers/refresh-access-token.handler';
import { SigninUserHandler } from './handlers/signin-user.handler';
import { SignoutUserHandler } from './handlers/signout-user.handler';
import { SignupUserHandler } from './handlers/signup-user.handler';
import { AuthTokenService } from './services/auth-token.service';

const commands = [SignupUserHandler, SigninUserHandler, RefreshAccessTokenHandler, SignoutUserHandler];
const queries = [];
const services = [AuthTokenService];

@Module({
  imports: [DatabaseModule, JwtModule.register({})],
  providers: [...commands, ...queries, ...services],
  controllers: [AuthController]
})
export class AuthModule {}
