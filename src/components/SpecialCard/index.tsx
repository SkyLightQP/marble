import React, { PropsWithChildren } from 'react';

export const SpecialCard: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-36 h-36 border-2 border-black p-2 flex flex-col justify-center items-center">{children}</div>
  );
};
