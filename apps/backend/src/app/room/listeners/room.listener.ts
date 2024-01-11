import { EventsHandler, IEventHandler, QueryBus } from '@nestjs/cqrs';
import { CreatedRoomEvent } from '@/app/room/events/created-room.event';
import { GetRoomsQuery } from '@/app/room/queries/get-rooms.query';
import { SocketGateway } from '@/app/socket/socket.gateway';

@EventsHandler(CreatedRoomEvent)
export class CreatedRoomListener implements IEventHandler<CreatedRoomEvent> {
  constructor(
    private readonly socketGateway: SocketGateway,
    private readonly queryBus: QueryBus
  ) {}

  async handle() {
    const rooms = await this.queryBus.execute(new GetRoomsQuery());
    this.socketGateway.server.in('lobby').emit('get-rooms', rooms);
  }
}
