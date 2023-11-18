import React from 'react';

type PlayerColor = 'blue' | 'red' | 'green' | 'yellow';

interface PlayerProps {
  readonly color: PlayerColor;
}

export const Player: React.FC<PlayerProps> = ({ color }) => {
  return <div className={`w-3.5 h-3.5 rounded-full bg-${color}-500`} />;
};
