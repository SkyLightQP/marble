import { useMemo } from 'react';
import { GameResponse } from '@/api/SocketResponse';
import { DotColor, DotColorTuple } from '@/types/DotColor';
import { DotItem } from '@/types/DotItem';
import { RankItem } from '@/types/Rank';

const COLOR_LIST: DotColorTuple = ['red', 'blue', 'green', 'yellow'];

export const useGamePlayer = (args: { game: GameResponse | undefined; user: string | undefined }) => {
  const { game, user } = args;

  const playerColors: Record<string, DotColor> = useMemo(() => {
    const uuids = Object.keys(game?.playerStatus ?? {});
    const randomColors = COLOR_LIST.toSorted(() => Math.random() - 0.5);
    return uuids.reduce(
      (prev, uuid, index) => ({ ...prev, [uuid]: randomColors[index] }),
      {} as Record<string, DotColor>
    );
  }, [game]);
  const playerPositions: Record<string, DotItem[]> = useMemo(
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
      color: playerColors[userId],
      price: status.money,
      isMe: userId === user
    }));
  }, [game, user, playerColors]);

  return {
    playerPositions,
    playerRanks
  };
};
