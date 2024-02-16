import clsx from 'clsx';
import React from 'react';
import { COLOR_MAP } from '@/styles/DotColorStyle';
import { DotColor } from '@/types/DotColor';

interface PlayerDotProps {
  readonly color: DotColor;
}

export const PlayerDot: React.FC<PlayerDotProps> = ({ color }) => {
  return <div className={clsx('h-3.5 w-3.5 rounded-full', COLOR_MAP[color])} />;
};
