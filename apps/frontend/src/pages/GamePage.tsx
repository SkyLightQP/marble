import { FC, useMemo, useState } from 'react';
import { GameResponse } from '@/api/SocketResponse';
import { GameBoard } from '@/components/GameBoard';
import { useSocketListener } from '@/hooks/useSocketListener';
import { useUser } from '@/hooks/useUser';
import { RootLayout } from '@/layouts/RootLayout';
import { DotItem } from '@/types/DotItem';

export const GamePage: FC = () => {
  const user = useUser();
  const [game, setGame] = useState<GameResponse>();

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

  useSocketListener<GameResponse>('start-game', setGame);

  return (
    <RootLayout className="h-screen w-screen">
      <GameBoard playerPositions={playerPositions} isMyTurn={game?.currentTurnPlayer === user} />
    </RootLayout>
  );
};
