import clsx from 'clsx';
import { LabelHTMLAttributes, PropsWithChildren } from 'react';

export const Label: React.FC<PropsWithChildren<LabelHTMLAttributes<never>>> = ({ children, className, ...props }) => {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label className={clsx('block text-left text-sm text-gray-400 ml-1', className)} {...props}>
      {children}
    </label>
  );
};
