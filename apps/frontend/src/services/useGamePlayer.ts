import { useMemo } from 'react';
import { GameResponse } from '@/api/SocketResponse';
import { DotItem } from '@/types/DotItem';
import { RankItem } from '@/types/Rank';

export const useGamePlayer = (args: { game: GameResponse | undefined; user: string | undefined }) => {
  const { game, user } = args;

  const playerPositions: Record<string, DotItem[]> = useMemo(
    () =>
      Object.entries(game?.playerStatus ?? {}).reduce(
        (prev, [userId, { position }]) => ({
          ...prev,
          [position]: [
            ...(prev[position] ?? []),
            {
              userId,
              color: game?.playerStatus[userId].color
            }
          ]
        }),
        {} as Record<string, DotItem[]>
      ),
    [game]
  );
  const playerRanks: RankItem[] = useMemo(() => {
    return Object.entries(game?.playerStatus ?? {}).map(([userId, status]) => ({
      name: status.nickname,
      color: status.color,
      price: status.money,
      isMe: userId === user
    }));
  }, [game, user]);

  return {
    playerPositions,
    playerRanks
  };
};
