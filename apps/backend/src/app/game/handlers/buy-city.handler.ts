import { CityPrice } from '@marble/database';
import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { RedisClientType } from 'redis';
import { GetCityByIdReturn } from '@/app/city/handlers/get-city-by-id.handler';
import { GetCityByIdQuery } from '@/app/city/queries/get-city-by-id.query';
import { BuyCityCommand } from '@/app/game/commands/buy-city.command';
import { Game } from '@/app/game/domain/game';
import { GetGameReturn } from '@/app/game/handlers/get-game.handler';
import { GetGameQuery } from '@/app/game/queries/get-game.query';
import { CityType } from '@/infrastructure/common/types/city-type.type';
import { ErrorCode } from '@/infrastructure/error/error-code';

export type BuyCityCommandReturn = Game;

@CommandHandler(BuyCityCommand)
export class BuyCityHandler implements ICommandHandler<BuyCityCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType
  ) {}

  async execute({ args: { roomId, cityId, cityType, executor } }: BuyCityCommand): Promise<BuyCityCommandReturn> {
    const city = await this.queryBus.execute<GetCityByIdQuery, GetCityByIdReturn>(new GetCityByIdQuery({ id: cityId }));
    const game = await this.queryBus.execute<GetGameQuery, GetGameReturn>(new GetGameQuery({ roomId }));

    if (game.cityWhoHave[cityId] !== undefined) {
      throw new WsException(ErrorCode.CITY_IS_ALREADY_BOUGHT);
    }

    if (game.playerOrder[game.currentOrderPlayerIndex].userId !== executor) {
      throw new WsException(ErrorCode.PLAYER_IS_NOT_TURN);
    }

    const playerStatus = game.playerStatus[executor];
    playerStatus.money -= this.getCityPrice(city.cityPrices[9], cityType);
    playerStatus.haveCities[cityId] = [...playerStatus.haveCities[cityId], cityType];
    game.cityWhoHave[cityId] = executor;

    await game.syncRedis(this.redis);

    Logger.log({ message: '도시를 구매했습니다.', roomId, cityId, cityType, executor });

    return game;
  }

  private getCityPrice(cityPrice: CityPrice, cityType: CityType) {
    switch (cityType) {
      case 'land':
        return cityPrice.landPrice;
      case 'house':
        return cityPrice.housePrice;
      case 'building':
        return cityPrice.buildingPrice;
      case 'hotel':
        return cityPrice.hotelPrice;
      default:
        return 0;
    }
  }
}
