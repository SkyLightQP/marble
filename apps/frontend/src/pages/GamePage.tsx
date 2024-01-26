import { FC, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { GameResponse } from '@/api/SocketResponse';
import { GameBoard } from '@/components/GameBoard';
import { useSocket } from '@/hooks/useSocket';
import { useSocketListener } from '@/hooks/useSocketListener';
import { useUser } from '@/hooks/useUser';
import { RootLayout } from '@/layouts/RootLayout';
import { DotColor } from '@/types/DotColor';
import { DotItem } from '@/types/DotItem';
import { RankItem } from '@/types/Rank';

export const GamePage: FC = () => {
  const user = useUser();
  const socket = useSocket();
  const [game, setGame] = useState<GameResponse>();
  const navigate = useNavigate();
  const { roomId } = useParams();

  // TODO: Create hooks to process business logic.

  const playerColors = useMemo(() => {
    const uuids = Object.keys(game?.playerStatus ?? {});
    const randomColors = ['red', 'blue', 'green', 'yellow'].sort(() => Math.random() - 0.5);
    return uuids.reduce(
      (prev, uuid, index) => ({ ...prev, [uuid]: randomColors[index] }),
      {} as Record<string, string>
    );
  }, [game]);
  const playerPositions = useMemo(
    () =>
      Object.entries(game?.playerStatus ?? {}).reduce(
        (prev, [userId, { position }]) => ({
          ...prev,
          [position]: [
            ...(prev[position] ?? []),
            {
              userId,
              color: playerColors[userId]
            }
          ]
        }),
        {} as Record<string, DotItem[]>
      ),
    [game, playerColors]
  );
  const playerRanks: RankItem[] = useMemo(() => {
    return Object.entries(game?.playerStatus ?? {}).map(([userId, status]) => ({
      name: status.nickname,
      color: playerColors[userId] as DotColor,
      price: status.money,
      isMe: userId === user
    }));
  }, [game, playerColors, user]);

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

  useEffect(() => {
    socket?.emit('get-game', { roomId });

    return () => {
      socket?.emit('dropout-game', { roomId });
    };
  }, [socket, roomId]);

  return (
    <RootLayout className="h-screen w-screen">
      <GameBoard playerPositions={playerPositions} isMyTurn={game?.currentTurnPlayer === user} ranks={playerRanks} />
    </RootLayout>
  );
};
