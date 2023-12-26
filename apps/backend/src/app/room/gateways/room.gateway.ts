import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { SocketJwtGuard } from '@infrastructure/guards/socket-jwt.guard';
import { JoinRoomCommand } from '../commands/join-room.command';
import { QuitRoomCommand } from '../commands/quit-room.command';
import { GetRoomsReturn } from '../handlers/get-rooms.handler';
import { JoinRoomReturn } from '../handlers/join-room.handler';
import { QuitRoomReturn } from '../handlers/quit-room.handler';
import { GetRoomsQuery } from '../queries/get-rooms.query';
import { JoinRoomDto } from './dto/join-room.dto';
import { QuitRoomDto } from './dto/quit-room.dto';

@WebSocketGateway({ cors: true })
export class RoomGateway {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @UseGuards(SocketJwtGuard)
  @SubscribeMessage('join-room')
  async handleJoinRoom(@MessageBody() message: JoinRoomDto): Promise<WsResponse<JoinRoomReturn>> {
    const data = await this.commandBus.execute(new JoinRoomCommand(message));
    return { event: 'join-room', data };
  }

  @UseGuards(SocketJwtGuard)
  @SubscribeMessage('quit-room')
  async handleQuitRoom(@MessageBody() message: QuitRoomDto): Promise<WsResponse<QuitRoomReturn>> {
    const data = await this.commandBus.execute(new QuitRoomCommand(message));
    return { event: 'quit-room', data };
  }

  @UseGuards(SocketJwtGuard)
  @SubscribeMessage('get-rooms')
  async handleGetRooms(): Promise<WsResponse<GetRoomsReturn>> {
    const data = await this.queryBus.execute(new GetRoomsQuery());
    return { event: 'get-rooms', data };
  }
}
