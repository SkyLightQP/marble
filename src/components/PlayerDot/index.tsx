import React from 'react';
import { DotColor } from '../../types/DotColor';

interface PlayerDotProps {
  readonly color: DotColor;
}

export const PlayerDot: React.FC<PlayerDotProps> = ({ color }) => {
  return <div className={`w-3.5 h-3.5 rounded-full bg-${color}-500`} />;
};
