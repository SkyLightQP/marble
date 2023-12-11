import clsx from 'clsx';
import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export const Button: React.FC<PropsWithChildren<ButtonHTMLAttributes<never>>> = ({ className, children, ...props }) => {
  return (
    <button
      type="button"
      className={clsx('block bg-blue-600 text-white rounded-md hover:bg-blue-700', className)}
      {...props}
    >
      {children}
    </button>
  );
};
