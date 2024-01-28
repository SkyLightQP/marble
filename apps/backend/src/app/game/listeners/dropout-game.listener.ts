import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DropoutGameEvent } from '@/app/game/events/dropout-game.event';
import { SocketGateway } from '@/app/socket/socket.gateway';

@EventsHandler(DropoutGameEvent)
export class DropoutGameListener implements IEventHandler<DropoutGameEvent> {
  constructor(private readonly socketGateway: SocketGateway) {}

  async handle({ args: { room, game } }: DropoutGameEvent) {
    this.socketGateway.server.to(`room:${room.id}`).emit('get-game', game);
  }
}
