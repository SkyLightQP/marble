import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SocketJwtGuard } from '@infrastructure/guards/socket-jwt.guard';
import { CreateRoomReturn } from '@app/room/handlers/create-room.handler';
import { CreateRoomCommand } from '@app/room/commands/create-room.command';
import type { Socket } from 'socket.io';
import { CreateRoomDto } from '@app/room/gateways/dto/create-room.dto';
import { AuthTokenPayload } from '@infrastructure/common/types/auth.type';
import { JoinRoomCommand } from '../commands/join-room.command';
import { QuitRoomCommand } from '../commands/quit-room.command';
import { GetRoomsReturn } from '../handlers/get-rooms.handler';
import { JoinRoomReturn } from '../handlers/join-room.handler';
import { QuitRoomReturn } from '../handlers/quit-room.handler';
import { GetRoomsQuery } from '../queries/get-rooms.query';
import { JoinRoomDto } from './dto/join-room.dto';
import { QuitRoomDto } from './dto/quit-room.dto';

@WebSocketGateway({ cors: true })
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  })
)
export class RoomGateway {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @UseGuards(SocketJwtGuard)
  @SubscribeMessage('join-room')
  async handleJoinRoom(
    @MessageBody() message: JoinRoomDto,
    @ConnectedSocket() socket: Socket & { user: AuthTokenPayload }
  ): Promise<WsResponse<JoinRoomReturn>> {
    const data = await this.commandBus.execute(
      new JoinRoomCommand({
        roomId: message.roomId,
        userId: socket.user.sub
      })
    );
    return { event: 'join-room', data };
  }

  @UseGuards(SocketJwtGuard)
  @SubscribeMessage('quit-room')
  async handleQuitRoom(
    @MessageBody() message: QuitRoomDto,
    @ConnectedSocket() socket: Socket & { user: AuthTokenPayload }
  ): Promise<WsResponse<QuitRoomReturn>> {
    const data = await this.commandBus.execute(
      new QuitRoomCommand({
        roomId: message.roomId,
        userId: socket.user.sub
      })
    );
    return { event: 'quit-room', data };
  }

  @UseGuards(SocketJwtGuard)
  @SubscribeMessage('get-rooms')
  async handleGetRooms(): Promise<WsResponse<GetRoomsReturn>> {
    const data = await this.queryBus.execute(new GetRoomsQuery());
    return { event: 'get-rooms', data };
  }

  @UseGuards(SocketJwtGuard)
  @UsePipes()
  @SubscribeMessage('create-room')
  async handleCreateRoom(
    @MessageBody() message: CreateRoomDto,
    @ConnectedSocket() socket: Socket & { user: AuthTokenPayload }
  ): Promise<WsResponse<CreateRoomReturn>> {
    const data = await this.commandBus.execute(
      new CreateRoomCommand({
        name: message.name,
        maxPlayer: message.maxPlayer,
        userId: socket.user.sub
      })
    );
    return { event: 'create-room', data };
  }
}
