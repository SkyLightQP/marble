import React from 'react';
import clsx from 'clsx';
import { DotColor } from '../../types/DotColor';

interface PlayerDotProps {
  readonly color: DotColor;
}

const COLOR_MAP = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500'
};

export const PlayerDot: React.FC<PlayerDotProps> = ({ color }) => {
  const colorStyle = COLOR_MAP[color];
  return <div className={clsx('w-3.5 h-3.5 rounded-full', colorStyle)} />;
};
