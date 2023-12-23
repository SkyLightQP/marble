import { Logger } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import type { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class RoomGateway {
  @WebSocketServer()
  private server!: Server;

  @SubscribeMessage('join')
  handleMessage(@MessageBody() message: string): boolean {
    Logger.debug(message);
    return true;
  }
}
