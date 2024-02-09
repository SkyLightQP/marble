import { Inject, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler, QueryBus } from '@nestjs/cqrs';
import { RedisClientType } from 'redis';
import { GetCityByPositionReturn } from '@/app/city/handlers/get-city-by-position.handler';
import { GetCityByPositionQuery } from '@/app/city/queries/get-city-by-position.query';
import { CITY_PENALTY_RATIO } from '@/app/game/constants/city-penalty.constant';
import { SPECIAL_CARD_POSITIONS } from '@/app/game/constants/game-board.constant';
import { RolledDiceEvent } from '@/app/game/events/rolled-dice.event';
import { SocketGateway } from '@/app/socket/socket.gateway';

@EventsHandler(RolledDiceEvent)
export class ArrivedCityListener implements IEventHandler<RolledDiceEvent> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly socketGateway: SocketGateway,
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType
  ) {}

  async handle({ args: { game, position, executePlayer } }: RolledDiceEvent) {
    if (SPECIAL_CARD_POSITIONS.includes(position)) return;

    const city = await this.queryBus.execute<GetCityByPositionQuery, GetCityByPositionReturn>(
      new GetCityByPositionQuery({ position })
    );
    const socketId = executePlayer.socketClientId;
    const cityOwnerId = game.cityWhoHave[city.id];
    const playerStatus = game.playerStatus[executePlayer.id];

    if (cityOwnerId === executePlayer.userId) {
      return;
    }

    const isCityOwnerOtherPlayer = cityOwnerId !== undefined && cityOwnerId !== executePlayer.userId;
    if (isCityOwnerOtherPlayer) {
      const ownerHaveCities = game.playerStatus[cityOwnerId].haveCities;
      let penalty = 0;

      ownerHaveCities[city.id].forEach((cityType) => {
        switch (cityType) {
          case 'land':
            penalty += city.cityPrices[0].landPrice;
            break;
          case 'house':
            penalty += city.cityPrices[0].housePrice * CITY_PENALTY_RATIO;
            break;
          case 'building':
            penalty += city.cityPrices[0].buildingPrice * CITY_PENALTY_RATIO;
            break;
          case 'hotel':
            penalty += city.cityPrices[0].hotelPrice * CITY_PENALTY_RATIO;
            break;
          default:
        }
      });

      this.socketGateway.server.to(socketId).emit('penalty', {
        city,
        ownerNickname: game.playerStatus[cityOwnerId].nickname,
        penalty
      });

      if (playerStatus.money < penalty) {
        // TODO: 파산 요청
        Logger.log({ message: '파산 요청을 보냈습니다.', target: executePlayer.userId, penalty });
      }

      playerStatus.money -= penalty;
      await game.syncRedis(this.redis);

      Logger.log({ message: '벌금 부과를 했습니다.', executor: executePlayer.userId });
      return;
    }

    this.socketGateway.server.to(socketId).emit('request-buy-city', {
      city
    });
    Logger.log({ message: '도시 구매 요청을 보냈습니다.', cityId: city.id, executor: executePlayer.userId });
  }
}
