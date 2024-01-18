import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from '@/app.controller';
import { AuthModule } from '@/app/auth/auth.module';
import { CityModule } from '@/app/city/city.module';
import { GameModule } from '@/app/game/game.module';
import { RoomModule } from '@/app/room/room.module';
import { UserModule } from '@/app/user/user.module';
import { DatabaseModule } from '@/infrastructure/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CqrsModule.forRoot(),
    DatabaseModule,
    UserModule,
    AuthModule,
    CityModule,
    RoomModule,
    GameModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
