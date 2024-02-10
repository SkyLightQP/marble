import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EndedTurnEvent } from '@/app/game/events/ended-turn.event';
import { SocketGateway } from '@/app/socket/socket.gateway';

@EventsHandler(EndedTurnEvent)
export class EndedTurnListener implements IEventHandler<EndedTurnEvent> {
  constructor(private readonly socketGateway: SocketGateway) {}

  handle({ args: { game } }: EndedTurnEvent) {
    this.socketGateway.server.to(`room:${game.roomId}`).emit('get-game', game);
  }
}
