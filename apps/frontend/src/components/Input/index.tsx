import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<never>>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={clsx('w-56 h-10 bg-white border-2 border-gray-300 rounded-md p-3', className)}
      {...props}
    />
  );
});
