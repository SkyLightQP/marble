import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedRoomEvent } from '@/app/room/events/updated-room.event';
import { SocketGateway } from '@/app/socket/socket.gateway';

@EventsHandler(UpdatedRoomEvent)
export class UpdatedRoomListener implements IEventHandler<UpdatedRoomEvent> {
  constructor(private readonly socketGateway: SocketGateway) {}

  handle({ args: { room } }: UpdatedRoomEvent) {
    this.socketGateway.server.to(`room:${room.id}`).emit('update-room', room);
  }
}
