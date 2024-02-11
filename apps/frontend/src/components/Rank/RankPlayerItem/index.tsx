import clsx from 'clsx';
import React from 'react';
import { PlayerDot } from '@/components/PlayerDot';
import { DotColor } from '@/types/DotColor';

interface RankPlayerItemProps {
  readonly rank: number;
  readonly name: string;
  readonly playerColor: DotColor;
  readonly currentPrice: number;
  readonly isMe?: boolean;
  readonly isDisable?: boolean;
}

export const RankPlayerItem: React.FC<RankPlayerItemProps> = ({
  rank,
  name,
  playerColor,
  currentPrice,
  isMe = false,
  isDisable = false
}) => {
  return (
    <div className={clsx('flex items-center', isDisable ? 'line-through' : '')}>
      <PlayerDot color={playerColor} />
      <p className={clsx('ml-2', isMe ? 'font-bold' : '')}>
        #{rank} {name}{' '}
        <span className="text-sm">({isDisable ? '파산' : `${currentPrice.toLocaleString('ko-KR')} 원`})</span>
      </p>
    </div>
  );
};
