import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { RedisClientType } from 'redis';
import { UpdateRoomCommand } from '@/app/room/commands/update-room.command';
import { Room } from '@/app/room/domain/room';
import { GetRoomReturn } from '@/app/room/handlers/get-room.handler';
import { GetRoomQuery } from '@/app/room/queries/get-room.query';
import { ErrorCode } from '@/infrastructure/error/error-code';

export type UpdateRoomReturn = Room;

@CommandHandler(UpdateRoomCommand)
export class UpdateRoomHandler implements ICommandHandler<UpdateRoomCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType
  ) {}

  async execute({ args: { roomId, name, maxPlayer, executor } }): Promise<UpdateRoomReturn> {
    const room = await this.queryBus.execute<GetRoomQuery, GetRoomReturn>(new GetRoomQuery({ roomId }));

    if (room.owner !== executor) {
      throw new WsException(ErrorCode.IS_NOT_OWNER);
    }

    room.name = name;
    room.maxPlayer = maxPlayer;

    await room.syncRedis(this.redis);

    return room;
  }
}
