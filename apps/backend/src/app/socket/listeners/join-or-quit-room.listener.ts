import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { JoinedRoomEvent } from '@/app/room/events/joined-room.event';
import { QuitRoomEvent } from '@/app/room/events/quit-room.event';
import { SocketGateway } from '@/app/socket/socket.gateway';

@EventsHandler(JoinedRoomEvent, QuitRoomEvent)
export class JoinOrQuitRoomListener implements IEventHandler<JoinedRoomEvent> {
  constructor(private readonly socketGateway: SocketGateway) {}

  handle({ args: { room } }: JoinedRoomEvent | QuitRoomEvent) {
    this.socketGateway.server.to(`room:${room.id}`).emit('get-room', room);
  }
}
