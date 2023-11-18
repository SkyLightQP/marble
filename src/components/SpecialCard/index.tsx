import React, { PropsWithChildren } from 'react';

export const SpecialCard: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-32 h-32 border-2 border-black p-2 flex flex-col justify-center items-center">{children}</div>
  );
};
