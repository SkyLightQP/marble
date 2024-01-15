import React, { PropsWithChildren } from 'react';
import { PlayerDot } from '@/components/PlayerDot';
import { DotColor } from '@/types/DotColor';

interface SpecialCardProps {
  readonly currentPlayers: {
    readonly userId: string;
    readonly color: DotColor;
  }[];
}

export const SpecialCard: React.FC<PropsWithChildren<SpecialCardProps>> = ({ children, currentPlayers }) => {
  return (
    <div className="flex h-32 w-32 flex-col items-center justify-center border-2 border-black p-2">
      <div>{children}</div>
      <div className="mt-1 flex space-x-1">
        {currentPlayers.map((player) => (
          <PlayerDot key={`special-${player.userId.slice(8)}`} color={player.color} />
        ))}
      </div>
    </div>
  );
};
