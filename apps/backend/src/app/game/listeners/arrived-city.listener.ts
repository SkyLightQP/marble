import { Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler, QueryBus } from '@nestjs/cqrs';
import { RedisClientType } from 'redis';
import { GetCityByPositionReturn } from '@/app/city/handlers/get-city-by-position.handler';
import { GetCityByPositionQuery } from '@/app/city/queries/get-city-by-position.query';
import { SPECIAL_CARD_POSITIONS } from '@/app/game/constants/game-board.constant';
import { EndedTurnEvent } from '@/app/game/events/ended-turn.event';
import { RolledDiceEvent } from '@/app/game/events/rolled-dice.event';
import { CalculatePenaltyService } from '@/app/game/services/calculate-penalty.service';
import { SocketGateway } from '@/app/socket/socket.gateway';

@EventsHandler(RolledDiceEvent)
export class ArrivedCityListener implements IEventHandler<RolledDiceEvent> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly socketGateway: SocketGateway,
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType,
    private readonly calculatePenaltyService: CalculatePenaltyService
  ) {}

  async handle({ args: { game, position, executePlayer } }: RolledDiceEvent) {
    Logger.log({ message: '도시에 도착했습니다.', executor: executePlayer.userId, position });

    if (SPECIAL_CARD_POSITIONS.includes(position)) {
      game.increaseCurrentOrderPlayerIndex();
      await game.syncRedis(this.redis);
      this.eventBus.publish(new EndedTurnEvent({ game }));
      Logger.log({ message: '특별한 액션 없이 턴을 끝냅니다.', executor: executePlayer.userId });
      return;
    }

    const city = await this.queryBus.execute<GetCityByPositionQuery, GetCityByPositionReturn>(
      new GetCityByPositionQuery({ position })
    );
    const cityOwnerId = game.cityWhoHave[city.id];
    const socketId = executePlayer.socketClientId;
    const playerStatus = game.getPlayerStatus(executePlayer.userId);

    if (cityOwnerId === executePlayer.userId) {
      game.increaseCurrentOrderPlayerIndex();
      await game.syncRedis(this.redis);
      this.eventBus.publish(new EndedTurnEvent({ game }));
      Logger.log({ message: '내 도시에 도착해 턴을 끝냅니다.', executor: executePlayer.userId });
      return;
    }

    const isCityOwnerOtherPlayer = cityOwnerId !== undefined && cityOwnerId !== executePlayer.userId;
    if (isCityOwnerOtherPlayer) {
      const ownerHaveCities = game.getPlayerStatus(cityOwnerId).haveCities;
      const penalty = this.calculatePenaltyService.calculate(ownerHaveCities[city.id], {
        land: city.cityPrices[0].landPrice,
        house: city.cityPrices[0].housePrice,
        building: city.cityPrices[0].buildingPrice,
        hotel: city.cityPrices[0].hotelPrice
      });

      this.socketGateway.server.to(socketId).emit('penalty', {
        city,
        ownerNickname: game.getPlayerStatus(cityOwnerId).nickname,
        penalty
      });

      if (playerStatus.money < penalty) {
        const currentPlayer = game.playerOrder[game.currentOrderPlayerIndex];
        currentPlayer.isDisable = true;

        game.removeCitiesWhoHavePlayer(executePlayer.userId);

        playerStatus.money = -1;
        playerStatus.land = 0;
        playerStatus.house = 0;
        playerStatus.building = 0;
        playerStatus.hotel = 0;

        await game.syncRedis(this.redis);

        Logger.log({ message: '플레이어를 파산 처리합니다.', target: executePlayer.userId, penalty });
        return;
      }

      game.takeMoney(executePlayer.userId, penalty);
      game.giveMoney(cityOwnerId, penalty);
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
