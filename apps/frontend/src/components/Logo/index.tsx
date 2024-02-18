import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

export const Logo: FC<HTMLAttributes<never>> = ({ className }) => {
  return (
    <h1 className={clsx('font-PartialSansKR text-3xl -ml-3', className)}>
      <span role="img" aria-label="dice">
        🎲
      </span>
      &nbsp;마&nbsp;블
    </h1>
  );
};
