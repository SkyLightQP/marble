import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { RedisClientType } from 'redis';
import { UpdateRoomCommand } from '@/app/room/commands/update-room.command';
import { Room } from '@/app/room/domain/room';
import { UpdatedRoomEvent } from '@/app/room/events/updated-room.event';
import { GetRoomReturn } from '@/app/room/handlers/get-room.handler';
import { GetRoomQuery } from '@/app/room/queries/get-room.query';
import { ErrorCode } from '@/infrastructure/error/error-code';

export type UpdateRoomReturn = Room;

@CommandHandler(UpdateRoomCommand)
export class UpdateRoomHandler implements ICommandHandler<UpdateRoomCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType
  ) {}

  async execute({ args: { roomId, name, maxPlayer, executor } }): Promise<UpdateRoomReturn> {
    const room = await this.queryBus.execute<GetRoomQuery, GetRoomReturn>(new GetRoomQuery({ roomId }));

    if (room.owner !== executor) {
      throw new WsException(ErrorCode.IS_NOT_OWNER);
    }

    if (maxPlayer < room.players.length) {
      throw new WsException(ErrorCode.INVALID_ROOM_PEOPLE);
    }

    room.name = name;
    room.maxPlayer = maxPlayer;

    await room.syncRedis(this.redis);
    this.eventBus.publish(new UpdatedRoomEvent({ room }));
    Logger.log({ message: '방 정보가 수정되었습니다.', room, executor });

    return room;
  }
}
