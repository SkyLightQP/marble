import { ErrorCode } from '@marble/common';
import { BadRequestException, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import type { Server, Socket } from 'socket.io';
import { WebsocketExceptionFilter } from '@/infrastructure/filters/websocket-exception.filter';
import { SocketJwtGuard } from '@/infrastructure/guards/socket-jwt.guard';

@WebSocketGateway({ cors: true })
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    },
    exceptionFactory: () => new BadRequestException(ErrorCode.BAD_REQUEST)
  })
)
@UseFilters(new WebsocketExceptionFilter())
export class SocketGateway {
  @WebSocketServer() server!: Server;

  @UseGuards(SocketJwtGuard)
  @SubscribeMessage('util:join-lobby')
  handleJoinLobby(@ConnectedSocket() socket: Socket): void {
    socket.join('lobby');
  }

  @UseGuards(SocketJwtGuard)
  @SubscribeMessage('util:quit-lobby')
  handleQuitLobby(@ConnectedSocket() socket: Socket): void {
    socket.leave('lobby');
  }
}
