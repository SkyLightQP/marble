import React, { PropsWithChildren } from 'react';
import { FieldError, RegisterOptions } from 'react-hook-form';

interface InputErrorProps {
  readonly formError: FieldError | undefined;
  readonly type: keyof RegisterOptions;
}

export const InputError: React.FC<PropsWithChildren<InputErrorProps>> = ({ formError, type, children }) => {
  return <>{formError?.type === type && <p className="text-xs text-red-400 mt-1 ml-[6px] text-left">{children}</p>}</>;
};
