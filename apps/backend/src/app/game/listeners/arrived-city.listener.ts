import { Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler, QueryBus } from '@nestjs/cqrs';
import { RedisClientType } from 'redis';
import { GetCityByPositionReturn } from '@/app/city/handlers/get-city-by-position.handler';
import { GetCityByPositionQuery } from '@/app/city/queries/get-city-by-position.query';
import { SPECIAL_CARD_POSITIONS } from '@/app/game/constants/game-board.constant';
import { EndedTurnEvent } from '@/app/game/events/ended-turn.event';
import { RolledDiceEvent } from '@/app/game/events/rolled-dice.event';
import { ProcessCityPenaltyService } from '@/app/game/services/process-city-penalty.service';
import { SocketGateway } from '@/app/socket/socket.gateway';

@EventsHandler(RolledDiceEvent)
export class ArrivedCityListener implements IEventHandler<RolledDiceEvent> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly socketGateway: SocketGateway,
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType,
    private readonly processCityPenaltyService: ProcessCityPenaltyService
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
      await this.processCityPenaltyService.process(game, city, executePlayer.userId, cityOwnerId);
      return;
    }

    this.socketGateway.server.to(socketId).emit('request-buy-city', {
      city
    });
    Logger.log({ message: '도시 구매 요청을 보냈습니다.', cityId: city.id, executor: executePlayer.userId });
  }
}
