import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { StartedGameEvent } from '@/app/game/events/started-game.event';
import { SocketGateway } from '@/app/socket/socket.gateway';

@EventsHandler(StartedGameEvent)
export class StartedGameListener implements IEventHandler<StartedGameEvent> {
  constructor(private readonly socketGateway: SocketGateway) {}

  handle({ args: { room, game } }: StartedGameEvent) {
    this.socketGateway.server.to(`room:${room.id}`).emit('start-game', game);
    this.socketGateway.server.to(`room:${room.id}`).emit('get-game', game);
  }
}
