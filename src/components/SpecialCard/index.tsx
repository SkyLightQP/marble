import React, { PropsWithChildren } from 'react';
import { PlayerDot } from '../PlayerDot';

export const SpecialCard: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-32 h-32 border-2 border-black p-2 flex flex-col justify-center items-center">
      <div>{children}</div>
      <div className="flex space-x-1 mt-1">
        <PlayerDot color="blue" />
        <PlayerDot color="yellow" />
        <PlayerDot color="green" />
        <PlayerDot color="red" />
      </div>
    </div>
  );
};
