import { FC, useEffect, useState } from 'react';
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

export const GamePage: FC = () => {
  const [game, setGame] = useState<GameResponse>();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const user = useUser();
  const socket = useSocket();
  const { playerPositions, playerRanks } = useGamePlayer({ game, user });

  useEffect(() => {
    socket?.emit('get-game', { roomId });
  }, [socket, roomId]);

  useQuitListener({ quitSocket: 'dropout-game', roomId: roomId ?? 'loading' });
  useSocketListener<GameResponse>('start-game', setGame);
  useSocketListener<GameResponse>('get-game', (data) => {
    setGame(data);

    const players = data.playerOrder;
    const isJoinWhilePlaying = user === undefined || !players.map(({ userId }) => userId).includes(user);
    if (isJoinWhilePlaying) {
      navigate('/rooms');
      toast.error('이미 게임이 진행 중입니다.');
    }
  });
  useSocketListener<WebSocketError>('exception', (error) => {
    toast.error(error.message);
    navigate(-1);
  });

  return (
    <RootLayout className="h-screen w-screen">
      <GameBoard playerPositions={playerPositions} isMyTurn={game?.currentTurnPlayer === user} ranks={playerRanks} />
    </RootLayout>
  );
};
