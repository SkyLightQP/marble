import { FC, PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';

interface CityCardBoxProps {
  readonly color: 'blue' | 'red' | 'green' | 'yellow';
}

export const CityCardBox: FC<PropsWithChildren<CityCardBoxProps>> = ({ color, children }) => {
  const borderColorMap = {
    blue: 'border-blue-600',
    red: 'border-red-600',
    green: 'border-green-600',
    yellow: 'border-yellow-600'
  };

  return (
    <div
      className={cn(
        'lg:w-40 lg:h-40 2xl:w-64 2xl:h-64 rounded-md border-2 flex items-center justify-center flex-col',
        borderColorMap[color]
      )}
    >
      {children}
    </div>
  );
};
