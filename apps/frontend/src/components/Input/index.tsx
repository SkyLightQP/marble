import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<never>>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn('h-10 w-56 rounded-md border-2 border-gray-300 bg-white p-3', className)}
      {...props}
    />
  );
});
