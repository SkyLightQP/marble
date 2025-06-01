import { FC, HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export const Logo: FC<HTMLAttributes<never>> = ({ className }) => {
  return (
    <h1 className={cn('font-PartialSansKR text-3xl -ml-3 tracking-widest', className)}>
      <span role="img" aria-label="dice">
        🎲
      </span>
      마블
    </h1>
  );
};
