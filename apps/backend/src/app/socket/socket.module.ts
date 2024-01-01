import { Module } from '@nestjs/common';
import { SocketGateway } from '@/app/socket/socket.gateway';

@Module({
  providers: [SocketGateway],
  controllers: [],
  exports: [SocketGateway]
})
export class SocketModule {}
