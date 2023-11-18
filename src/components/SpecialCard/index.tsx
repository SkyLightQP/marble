import React, { PropsWithChildren } from 'react';
import { Player } from '../Player';

export const SpecialCard: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-32 h-32 border-2 border-black p-2 flex flex-col justify-center items-center">
      <div>{children}</div>
      <div className="flex space-x-1 mt-1">
        <Player color="blue" />
        <Player color="yellow" />
        <Player color="green" />
        <Player color="red" />
      </div>
    </div>
  );
};
