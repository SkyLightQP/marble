import clsx from 'clsx';
import { PropsWithChildren } from 'react';

export const RootLayout: React.FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  return <div className={clsx('bg-gray-50', className)}>{children}</div>;
};
