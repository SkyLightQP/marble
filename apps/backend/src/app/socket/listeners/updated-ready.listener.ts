import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedReadyEvent } from '@/app/room/events/updated-ready.event';
import { SocketGateway } from '@/app/socket/socket.gateway';

@EventsHandler(UpdatedReadyEvent)
export class UpdatedReadyListener implements IEventHandler<UpdatedReadyEvent> {
  constructor(private readonly socketGateway: SocketGateway) {}

  handle({ args: { room } }: UpdatedReadyEvent) {
    this.socketGateway.server.to(`room:${room.id}`).emit('get-room', room);
  }
}
