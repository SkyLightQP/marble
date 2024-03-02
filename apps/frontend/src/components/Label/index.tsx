import { FC, LabelHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';

export const Label: FC<PropsWithChildren<LabelHTMLAttributes<never>>> = ({ children, className, ...props }) => {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label className={cn('ml-1 block text-left text-sm text-gray-400', className)} {...props}>
      {children}
    </label>
  );
};
