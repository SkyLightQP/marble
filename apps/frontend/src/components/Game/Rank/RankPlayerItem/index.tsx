import { FC } from 'react';
import { PlayerDot } from '@/components/Game/PlayerDot';
import { DotColor } from '@/types/DotColor';
import { cn } from '@/utils/cn';

interface RankPlayerItemProps {
  readonly rank: number;
  readonly name: string;
  readonly playerColor: DotColor;
  readonly currentPrice: number;
  readonly isMe?: boolean;
  readonly isDisable?: boolean;
}

export const RankPlayerItem: FC<RankPlayerItemProps> = ({
  rank,
  name,
  playerColor,
  currentPrice,
  isMe = false,
  isDisable = false
}) => {
  return (
    <div className={cn('flex items-center', isDisable ? 'line-through' : '')}>
      <PlayerDot color={playerColor} />
      <p className={cn('ml-2', isMe ? 'font-bold' : '')}>
        #{rank} {name}{' '}
        <span className="text-sm">({isDisable ? '파산' : `${currentPrice.toLocaleString('ko-KR')} 원`})</span>
      </p>
    </div>
  );
};
