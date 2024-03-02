import { FC } from 'react';
import { BACKGROUND_COLOR_MAP } from '@/styles/DotColorStyle';
import { DotColor } from '@/types/DotColor';
import { cn } from '@/utils/cn';

interface PlayerDotProps {
  readonly color: DotColor;
}

export const PlayerDot: FC<PlayerDotProps> = ({ color }) => {
  return <div className={cn('h-3.5 w-3.5 rounded-full', BACKGROUND_COLOR_MAP[color])} />;
};
