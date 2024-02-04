import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RolledDiceEvent } from '@/app/game/events/rolled-dice.event';
import { SocketGateway } from '@/app/socket/socket.gateway';

@EventsHandler(RolledDiceEvent)
export class RolledDiceListener implements IEventHandler<RolledDiceEvent> {
  constructor(private readonly socketGateway: SocketGateway) {}

  handle({ args: { game } }: RolledDiceEvent) {
    this.socketGateway.server.to(`room:${game.roomId}`).emit('get-game', game);
  }
}
