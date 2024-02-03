import { FC } from 'react';
import { RiTrophyLine } from 'react-icons/ri';
import { RankPlayerItem } from '@/components/Rank/RankPlayerItem';
import { RankItem } from '@/types/Rank';

interface RankViewProps {
  readonly ranks: RankItem[];
}

export const RankView: FC<RankViewProps> = ({ ranks }) => {
  return (
    <div className="h-60 w-60 rounded-xl border-2 border-gray-300 bg-white p-4">
      <h1 className="mb-2 flex items-center text-xl font-bold">
        <RiTrophyLine className="mr-1" />
        순위
      </h1>
      <div className="space-y-1">
        {ranks
          .sort((a, b) => b.price - a.price)
          .map((rank, index) => (
            <RankPlayerItem
              key={`rank-${rank.name}`}
              rank={index + 1}
              name={rank.name}
              playerColor={rank.color}
              currentPrice={rank.price}
              isMe={rank.isMe}
            />
          ))}
      </div>
    </div>
  );
};
