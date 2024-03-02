import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';

export const Button: FC<PropsWithChildren<ButtonHTMLAttributes<never>>> = ({ className, children, ...props }) => {
  return (
    <button
      type="button"
      className={cn('block rounded-md bg-blue-600 text-white hover:bg-blue-700', className)}
      {...props}
    >
      {children}
    </button>
  );
};
