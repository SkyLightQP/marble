import { FC, PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';

export const RootLayout: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  return <div className={cn('bg-gray-50', className)}>{children}</div>;
};
