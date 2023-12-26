import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
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

  @SubscribeMessage('join-room')
  async handleJoinRoom(@MessageBody() message: JoinRoomDto): Promise<JoinRoomReturn> {
    return this.commandBus.execute(new JoinRoomCommand(message));
  }

  @SubscribeMessage('quit-room')
  async handleQuitRoom(@MessageBody() message: QuitRoomDto): Promise<QuitRoomReturn> {
    return this.commandBus.execute(new QuitRoomCommand(message));
  }

  @SubscribeMessage('get-rooms')
  async handleGetRooms(): Promise<GetRoomsReturn> {
    return this.queryBus.execute(new GetRoomsQuery());
  }
}
