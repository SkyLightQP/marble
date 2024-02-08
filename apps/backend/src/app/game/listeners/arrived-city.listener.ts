import { EventsHandler, IEventHandler, QueryBus } from '@nestjs/cqrs';
import { GetCityByPositionReturn } from '@/app/city/handlers/get-city-by-position.handler';
import { GetCityByPositionQuery } from '@/app/city/queries/get-city-by-position.query';
import { RolledDiceEvent } from '@/app/game/events/rolled-dice.event';
import { SocketGateway } from '@/app/socket/socket.gateway';

@EventsHandler(RolledDiceEvent)
export class ArrivedCityListener implements IEventHandler<RolledDiceEvent> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly socketGateway: SocketGateway
  ) {}

  async handle({ args: { game, position, executePlayer } }: RolledDiceEvent) {
    const city = await this.queryBus.execute<GetCityByPositionQuery, GetCityByPositionReturn>(
      new GetCityByPositionQuery({ position })
    );
    const socketId = executePlayer.socketClientId;

    if (game.cityWhoHave[position] !== undefined) {
      this.socketGateway.server.to(socketId).emit('penalty', {
        city,
        ownerNickname: game.playerStatus[executePlayer.id].nickname
      });

      // TODO: 벌금 내기
    } else {
      this.socketGateway.server.to(socketId).emit('request-buy-city', {
        city
      });
    }
  }
}
