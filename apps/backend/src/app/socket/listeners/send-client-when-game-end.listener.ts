import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EndedGameEvent } from '@/app/game/events/ended-game.event';
import { SocketGateway } from '@/app/socket/socket.gateway';

@EventsHandler(EndedGameEvent)
export class SendClientWhenGameEndListener implements IEventHandler<EndedGameEvent> {
  constructor(private readonly socketGateway: SocketGateway) {}

  handle({ args: { game } }: EndedGameEvent) {
    this.socketGateway.server.to(`room:${game.roomId}`).emit('end-game', game);
  }
}
