import { ErrorCode } from '@marble/common';
import { BadRequestException, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import type { Socket } from 'socket.io';
import { BuyCityCommand } from '@/app/game/commands/buy-city.command';
import { DropoutGameCommand } from '@/app/game/commands/dropout-game.command';
import { EndTurnCommand } from '@/app/game/commands/end-turn.command';
import { RollDiceCommand } from '@/app/game/commands/roll-dice.command';
import { StartGameCommand } from '@/app/game/commands/start-game.command';
import { BuyCityDto } from '@/app/game/gateways/dto/buy-city.dto';
import { DropoutGameDto } from '@/app/game/gateways/dto/dropout-game.dto';
import { GetGameDto } from '@/app/game/gateways/dto/get-game.dto';
import { RollDiceDto } from '@/app/game/gateways/dto/roll-dice.dto';
import { StartGameDto } from '@/app/game/gateways/dto/start-game.dto';
import { BuyCityReturn } from '@/app/game/handlers/buy-city.handler';
import { DropoutGameReturn } from '@/app/game/handlers/dropout-game.handler';
import { GetGameReturn } from '@/app/game/handlers/get-game.handler';
import { RollDiceReturn } from '@/app/game/handlers/roll-dice.handler';
import { StartGameReturn } from '@/app/game/handlers/start-game.handler';
import { GetGameQuery } from '@/app/game/queries/get-game.query';
import { AuthTokenPayload } from '@/infrastructure/common/types/auth.type';
import { WebsocketExceptionFilter } from '@/infrastructure/filters/websocket-exception.filter';
import { SocketJwtGuard } from '@/infrastructure/guards/socket-jwt.guard';

@WebSocketGateway({ cors: true })
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    },
    exceptionFactory: () => new BadRequestException(ErrorCode.BAD_REQUEST)
  })
)
@UseFilters(new WebsocketExceptionFilter())
export class GameGateway {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @UseGuards(SocketJwtGuard)
  @SubscribeMessage('start-game')
  async handleStartGame(
    @MessageBody() message: StartGameDto,
    @ConnectedSocket() socket: Socket & { user: AuthTokenPayload }
  ): Promise<WsResponse<StartGameReturn>> {
    const data = await this.commandBus.execute(
      new StartGameCommand({ roomId: message.roomId, executor: socket.user.sub })
    );
    return { event: 'start-game', data };
  }

  @UseGuards(SocketJwtGuard)
  @SubscribeMessage('get-game')
  async handleGetGame(@MessageBody() message: GetGameDto): Promise<WsResponse<GetGameReturn>> {
    const data = await this.queryBus.execute(new GetGameQuery({ roomId: message.roomId }));
    return { event: 'get-game', data };
  }

  @UseGuards(SocketJwtGuard)
  @SubscribeMessage('dropout-game')
  async handleDropoutGame(
    @MessageBody() message: DropoutGameDto,
    @ConnectedSocket() socket: Socket & { user: AuthTokenPayload }
  ): Promise<WsResponse<DropoutGameReturn>> {
    const data = await this.commandBus.execute(
      new DropoutGameCommand({ roomId: message.roomId, userId: socket.user.sub })
    );
    return { event: 'dropout-game', data };
  }

  @UseGuards(SocketJwtGuard)
  @SubscribeMessage('roll-dice')
  async handleRollDice(
    @MessageBody() message: RollDiceDto,
    @ConnectedSocket() socket: Socket & { user: AuthTokenPayload }
  ): Promise<WsResponse<RollDiceReturn>> {
    const data = await this.commandBus.execute(
      new RollDiceCommand({ roomId: message.roomId, executor: socket.user.sub })
    );
    return { event: 'roll-dice', data };
  }

  @UseGuards(SocketJwtGuard)
  @SubscribeMessage('buy-city')
  async handleBuyCity(
    @MessageBody() message: BuyCityDto,
    @ConnectedSocket() socket: Socket & { user: AuthTokenPayload }
  ): Promise<WsResponse<BuyCityReturn>> {
    const data = await this.commandBus.execute(
      new BuyCityCommand({
        roomId: message.roomId,
        cityId: message.cityId,
        cityType: message.cityType,
        executor: socket.user.sub
      })
    );
    return { event: 'buy-city', data };
  }

  @UseGuards(SocketJwtGuard)
  @SubscribeMessage('end-turn')
  async handleEndTurn(
    @MessageBody() message: { roomId: string },
    @ConnectedSocket() socket: Socket & { user: AuthTokenPayload }
  ): Promise<void> {
    await this.commandBus.execute(new EndTurnCommand({ roomId: message.roomId, executor: socket.user.sub }));
  }
}
