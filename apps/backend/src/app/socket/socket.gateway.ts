import { BadRequestException, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConnectedSocket, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import type { Socket } from 'socket.io';
import { ErrorCode } from '@/infrastructure/error/error-code';
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
