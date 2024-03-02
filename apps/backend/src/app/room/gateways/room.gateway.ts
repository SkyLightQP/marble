import { BadRequestException, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import type { Socket } from 'socket.io';
import { CreateRoomCommand } from '@/app/room/commands/create-room.command';
import { JoinRoomCommand } from '@/app/room/commands/join-room.command';
import { QuitRoomCommand } from '@/app/room/commands/quit-room.command';
import { CreateRoomDto } from '@/app/room/gateways/dto/create-room.dto';
import { GetRoomDto } from '@/app/room/gateways/dto/get-room.dto';
import { JoinRoomDto } from '@/app/room/gateways/dto/join-room.dto';
import { QuitRoomDto } from '@/app/room/gateways/dto/quit-room.dto';
import { CreateRoomReturn } from '@/app/room/handlers/create-room.handler';
import { GetRoomReturn } from '@/app/room/handlers/get-room.handler';
import { GetRoomsReturn } from '@/app/room/handlers/get-rooms.handler';
import { JoinRoomReturn } from '@/app/room/handlers/join-room.handler';
import { QuitRoomReturn } from '@/app/room/handlers/quit-room.handler';
import { GetRoomQuery } from '@/app/room/queries/get-room.query';
import { GetRoomsQuery } from '@/app/room/queries/get-rooms.query';
import { AuthTokenPayload } from '@/infrastructure/common/types/auth.type';
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
    const data = await this.commandBus.execute<JoinRoomCommand, JoinRoomReturn>(
      new JoinRoomCommand({
        roomId: message.roomId,
        userId: socket.user.sub,
        socketClientId: socket.id
      })
    );
    socket.join(`room:${data.id}`);
    return { event: 'join-room', data };
  }

  @UseGuards(SocketJwtGuard)
  @SubscribeMessage('quit-room')
  async handleQuitRoom(
    @MessageBody() message: QuitRoomDto,
    @ConnectedSocket() socket: Socket & { user: AuthTokenPayload }
  ): Promise<WsResponse<QuitRoomReturn>> {
    const data = await this.commandBus.execute<QuitRoomCommand, QuitRoomReturn>(
      new QuitRoomCommand({
        roomId: message.roomId,
        userId: socket.user.sub
      })
    );
    socket.leave(`room:${data.id}`);
    return { event: 'quit-room', data };
  }

  @UseGuards(SocketJwtGuard)
  @SubscribeMessage('create-room')
  async handleCreateRoom(
    @MessageBody() message: CreateRoomDto,
    @ConnectedSocket() socket: Socket & { user: AuthTokenPayload }
  ): Promise<WsResponse<CreateRoomReturn>> {
    const data = await this.commandBus.execute<CreateRoomCommand, CreateRoomReturn>(
      new CreateRoomCommand({
        name: message.name,
        maxPlayer: message.maxPlayer,
        userId: socket.user.sub
      })
    );
    socket.join(`room:${data.id}`);
    return { event: 'create-room', data };
  }

  @UseGuards(SocketJwtGuard)
  @SubscribeMessage('get-rooms')
  async handleGetRooms(): Promise<WsResponse<GetRoomsReturn>> {
    const data = await this.queryBus.execute(new GetRoomsQuery());
    return { event: 'get-rooms', data };
  }

  @UseGuards(SocketJwtGuard)
  @SubscribeMessage('get-room')
  async handleGetRoom(@MessageBody() message: GetRoomDto): Promise<WsResponse<GetRoomReturn>> {
    const data = await this.queryBus.execute(new GetRoomQuery({ roomId: message.roomId }));
    return { event: 'get-room', data };
  }
}
