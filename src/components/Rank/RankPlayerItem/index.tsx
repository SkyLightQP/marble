import React from 'react';
import clsx from 'clsx';
import { PlayerDot } from '../../PlayerDot';
import { DotColor } from '../../../types/DotColor';

interface RankPlayerItemProps {
  readonly rank: number;
  readonly name: string;
  readonly playerColor: DotColor;
  readonly currentPrice: number;
  readonly isMe?: boolean;
}

export const RankPlayerItem: React.FC<RankPlayerItemProps> = ({
  rank,
  name,
  playerColor,
  currentPrice,
  isMe = false
}) => {
  return (
    <div className="flex items-center">
      <PlayerDot color={playerColor} />
      <p className={clsx('ml-2', isMe ? 'font-bold' : '')}>
        #{rank} {name} <span className="text-sm">({currentPrice.toLocaleString('ko-KR')} 원)</span>
      </p>
    </div>
  );
};
