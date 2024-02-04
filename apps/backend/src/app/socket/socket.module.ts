import { Module } from '@nestjs/common';
import { DropoutGameListener } from '@/app/socket/listeners/dropout-game.listener';
import { JoinOrQuitRoomListener } from '@/app/socket/listeners/join-or-quit-room.listener';
import { RefreshRoomListener } from '@/app/socket/listeners/refresh-room.listener';
import { RolledDiceListener } from '@/app/socket/listeners/rolled-dice.listener';
import { StartedGameListener } from '@/app/socket/listeners/started-game.listener';
import { SocketGateway } from '@/app/socket/socket.gateway';

const listeners = [
  DropoutGameListener,
  JoinOrQuitRoomListener,
  RefreshRoomListener,
  RolledDiceListener,
  StartedGameListener
];

@Module({
  providers: [SocketGateway, ...listeners],
  controllers: []
})
export class SocketModule {}
