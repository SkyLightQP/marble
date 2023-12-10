import clsx from 'clsx';
import React, { InputHTMLAttributes } from 'react';

interface InputProps {
  readonly className?: string;
}

export const Input: React.FC<InputHTMLAttributes<InputProps>> = ({ className, ...props }) => {
  return <input className={clsx('w-56 h-10 bg-white border-2 border-gray-300 rounded-md p-3', className)} {...props} />;
};