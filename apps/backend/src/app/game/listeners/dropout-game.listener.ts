import { EventsHandler, IEventHandler, QueryBus } from '@nestjs/cqrs';
import { DropoutGameEvent } from '@/app/game/events/dropout-game.event';
import { GetGameQuery } from '@/app/game/queries/get-game.query';
import { SocketGateway } from '@/app/socket/socket.gateway';

@EventsHandler(DropoutGameEvent)
export class DropoutGameListener implements IEventHandler<DropoutGameEvent> {
  constructor(
    private readonly socketGateway: SocketGateway,
    private readonly queryBus: QueryBus
  ) {}

  async handle({ args: { room } }: DropoutGameEvent) {
    const game = await this.queryBus.execute(new GetGameQuery({ roomId: room.id }));
    this.socketGateway.server.to(`room:${room.id}`).emit('get-game', game);
  }
}
