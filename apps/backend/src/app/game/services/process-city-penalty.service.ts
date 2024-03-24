import { City, CityPrice } from '@marble/database';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventBus, QueryBus } from '@nestjs/cqrs';
import { RedisClientType } from 'redis';
import { Game } from '@/app/game/domain/game';
import { EndedGameEvent } from '@/app/game/events/ended-game.event';
import { GetRoomReturn } from '@/app/room/handlers/get-room.handler';
import { GetRoomQuery } from '@/app/room/queries/get-room.query';
import { SocketGateway } from '@/app/socket/socket.gateway';
import { CityType } from '@/infrastructure/common/types/city-type.type';

const LAND_PENALTY_RATIO = 0.7;
const HOUSE_PENALTY_RATIO = 1.5;
const BUILDING_PENALTY_RATIO = 2;
const HOTEL_PENALTY_RATIO = 2.7;

@Injectable()
export class ProcessCityPenaltyService {
  constructor(
    private readonly socketGateway: SocketGateway,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType
  ) {}

  async process(game: Game, city: City & { cityPrices: Array<CityPrice> }, userId: string, ownerId: string) {
    const playerStatus = game.getPlayerStatus(userId);
    const socketId = game.playerOrder[game.currentOrderPlayerIndex].socketClientId;
    const ownerHaveCities = game.getPlayerStatus(ownerId).haveCities;
    const penalty = this.calculatePenalty(ownerHaveCities[city.id], {
      land: city.cityPrices[0].landPrice,
      house: city.cityPrices[0].housePrice,
      building: city.cityPrices[0].buildingPrice,
      hotel: city.cityPrices[0].hotelPrice
    });

    this.socketGateway.server.to(socketId).emit('penalty', {
      city,
      ownerNickname: game.getPlayerStatus(ownerId).nickname,
      penalty
    });

    if (playerStatus.money < penalty) {
      const currentPlayer = game.playerOrder[game.currentOrderPlayerIndex];
      currentPlayer.isDisable = true;

      game.removeCitiesWhoHavePlayer(userId);

      playerStatus.money = -1;
      playerStatus.land = 0;
      playerStatus.house = 0;
      playerStatus.building = 0;
      playerStatus.hotel = 0;

      await game.syncRedis(this.redis);

      Logger.log({ message: '플레이어를 파산 처리합니다.', target: userId, penalty });

      if (game.getPlayersNotDisable().length <= 1) {
        const room = await this.queryBus.execute<GetRoomQuery, GetRoomReturn>(
          new GetRoomQuery({ roomId: game.roomId })
        );
        this.eventBus.publish(new EndedGameEvent({ game, room }));
      }

      return;
    }

    game.takeMoney(userId, penalty);
    game.giveMoney(ownerId, penalty);
    await game.syncRedis(this.redis);

    Logger.log({ message: '벌금 부과를 했습니다.', executor: userId });
  }

  private calculatePenalty(
    haveCityTypes: CityType[],
    price: {
      land: number;
      house: number;
      building: number;
      hotel: number;
    }
  ): number {
    let penalty = 0;

    haveCityTypes.forEach((cityType) => {
      switch (cityType) {
        case 'land':
          penalty += Math.floor(price.land * LAND_PENALTY_RATIO);
          break;
        case 'house':
          penalty += Math.floor(price.house * HOUSE_PENALTY_RATIO);
          break;
        case 'building':
          penalty += Math.floor(price.building * BUILDING_PENALTY_RATIO);
          break;
        case 'hotel':
          penalty += Math.floor(price.hotel * HOTEL_PENALTY_RATIO);
          break;
        default:
      }
    });

    return penalty;
  }
}
