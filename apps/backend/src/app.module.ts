import { AppController } from '@app.controller';
import { AuthModule } from '@app/auth/auth.module';
import { CityModule } from '@app/city/city.module';
import { RoomModule } from '@app/room/room.module';
import { UserModule } from '@app/user/user.module';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { RedisModule } from '@infrastructure/redis/redis.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CqrsModule.forRoot(),
    DatabaseModule,
    RedisModule,
    UserModule,
    AuthModule,
    CityModule,
    RoomModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
