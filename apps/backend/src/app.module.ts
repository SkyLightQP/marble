import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from 'app/auth/auth.module';
import { UserModule } from 'app/user/user.module';
import { AppController } from './app.controller';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CqrsModule.forRoot(), DatabaseModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
