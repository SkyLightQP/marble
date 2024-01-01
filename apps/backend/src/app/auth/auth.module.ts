import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@/app/auth/controllers/auth.controller';
import { RefreshAccessTokenHandler } from '@/app/auth/handlers/refresh-access-token.handler';
import { SigninUserHandler } from '@/app/auth/handlers/signin-user.handler';
import { SignoutUserHandler } from '@/app/auth/handlers/signout-user.handler';
import { SignupUserHandler } from '@/app/auth/handlers/signup-user.handler';
import { AuthTokenService } from '@/app/auth/services/auth-token.service';
import { DatabaseModule } from '@/infrastructure/database/database.module';

const commands = [SignupUserHandler, SigninUserHandler, RefreshAccessTokenHandler, SignoutUserHandler];
const queries = [];
const services = [AuthTokenService];

@Global()
@Module({
  imports: [DatabaseModule, JwtModule.register({})],
  providers: [...commands, ...queries, ...services],
  controllers: [AuthController],
  exports: [AuthTokenService]
})
export class AuthModule {}
