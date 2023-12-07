import { AppController } from '@app.controller';
import { AuthModule } from '@app/auth/auth.module';
import { CityModule } from '@app/city/city.module';
import { UserModule } from '@app/user/user.module';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CqrsModule.forRoot(),
    DatabaseModule,
    UserModule,
    AuthModule,
    CityModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
