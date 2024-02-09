import { FC, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { GameResponse, WebSocketError } from '@/api/SocketResponse';
import { GameBoard } from '@/components/GameBoard';
import { useSocket } from '@/hooks/useSocket';
import { useSocketListener } from '@/hooks/useSocketListener';
import { useUser } from '@/hooks/useUser';
import { RootLayout } from '@/layouts/RootLayout';
import { useGamePlayer } from '@/services/useGamePlayer';
import { useQuitListener } from '@/services/useQuitListener';
import { useGameStore } from '@/stores/useGameStore';

export const GamePage: FC = () => {
  const game = useGameStore();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const user = useUser();
  const socket = useSocket();
  const { playerPositions, playerRanks } = useGamePlayer({ user });
  const isMyTurn = useMemo(() => {
    if (!game.isLoading || user === undefined) return false;
    return game.playerOrder[game.currentOrderPlayerIndex].userId === user;
  }, [game, user]);

  useEffect(() => {
    socket?.emit('get-game', { roomId });
  }, [socket, roomId]);

  useEffect(() => {
    if (isMyTurn) {
      toast('당신의 차례입니다!');
    }
  }, [isMyTurn]);

  useQuitListener({ quitSocket: 'dropout-game', roomId: roomId ?? 'loading' });
  useSocketListener<GameResponse>('start-game', game.setState);
  useSocketListener<GameResponse>('get-game', (data) => {
    game.setState(data);

    const players = data.playerOrder;
    const isJoinWhilePlaying = user === undefined || !players.map(({ userId }) => userId).includes(user);
    if (isJoinWhilePlaying) {
      navigate('/rooms');
      toast.error('이미 게임이 진행 중입니다.');
    }
  });
  useSocketListener<WebSocketError>('exception', (error) => {
    toast.error(error.message);
    if (error.code === 'ROOM_NOT_FOUND') navigate(-1);
  });

  if (!game.isLoading || user === undefined) {
    return (
      <RootLayout className="h-screen w-screen">
        <h1>Loading</h1>
      </RootLayout>
    );
  }

  return (
    <RootLayout className="h-screen w-screen select-none flex justify-center items-center">
      <GameBoard positions={playerPositions} isMyTurn={isMyTurn} ranks={playerRanks} />
    </RootLayout>
  );
};
