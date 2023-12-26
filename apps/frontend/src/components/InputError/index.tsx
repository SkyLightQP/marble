import React, { PropsWithChildren } from 'react';
import { FieldError, RegisterOptions } from 'react-hook-form';

interface InputErrorProps {
  readonly formError: FieldError | undefined;
  readonly type: keyof RegisterOptions;
  readonly message?: string;
}

export const InputError: React.FC<PropsWithChildren<InputErrorProps>> = ({ formError, type, message, children }) => {
  if (type === 'validate' && formError?.message === message) {
    return <p className="ml-[6px] mt-1 text-left text-xs text-red-400">{children}</p>;
  }
  if (type === 'validate' && formError?.message !== message) {
    return <></>;
  }

  return <>{formError?.type === type && <p className="ml-[6px] mt-1 text-left text-xs text-red-400">{children}</p>}</>;
};
