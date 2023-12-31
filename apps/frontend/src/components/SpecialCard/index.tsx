import React, { PropsWithChildren } from 'react';
import { PlayerDot } from '@/components/PlayerDot';

export const SpecialCard: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-32 w-32 flex-col items-center justify-center border-2 border-black p-2">
      <div>{children}</div>
      <div className="mt-1 flex space-x-1">
        <PlayerDot color="blue" />
        <PlayerDot color="yellow" />
        <PlayerDot color="green" />
        <PlayerDot color="red" />
      </div>
    </div>
  );
};
