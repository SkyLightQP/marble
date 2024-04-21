import { ErrorCode } from '@marble/common';
import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { RedisClientType } from 'redis';
import { ToggleReadyCommand } from '@/app/room/commands/toggle-ready.command';
import { UpdatedReadyEvent } from '@/app/room/events/updated-ready.event';
import { GetRoomReturn } from '@/app/room/handlers/get-room.handler';
import { GetRoomQuery } from '@/app/room/queries/get-room.query';

@CommandHandler(ToggleReadyCommand)
export class ToggleReadyHandler implements ICommandHandler<ToggleReadyCommand> {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus
  ) {}

  async execute({ args: { roomId, userId } }: ToggleReadyCommand): Promise<void> {
    const room = await this.queryBus.execute<GetRoomQuery, GetRoomReturn>(new GetRoomQuery({ roomId }));
    const player = room.players.find((player) => player.userId === userId);

    if (player === undefined) {
      throw new WsException(ErrorCode.PLAYER_NOT_FOUND);
    }

    player.toggleReady();

    await room.syncRedis(this.redis);

    this.eventBus.publish(new UpdatedReadyEvent({ room, player }));

    Logger.log({ message: '플레이어 준비 상태를 변경했습니다.', roomId, userId });
  }
}
