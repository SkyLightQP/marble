import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<never>>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={clsx('h-10 w-56 rounded-md border-2 border-gray-300 bg-white p-3', className)}
      {...props}
    />
  );
});
