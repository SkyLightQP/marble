import clsx from 'clsx';
import { LabelHTMLAttributes, PropsWithChildren } from 'react';

export const Label: React.FC<PropsWithChildren<LabelHTMLAttributes<never>>> = ({ children, className, ...props }) => {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label className={clsx('ml-1 block text-left text-sm text-gray-400', className)} {...props}>
      {children}
    </label>
  );
};
