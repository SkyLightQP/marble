import clsx from 'clsx';
import React from 'react';
import { IconType } from 'react-icons';
import { PlayerDot } from '../PlayerDot';

interface CityCardProps {
  readonly icon: IconType;
  readonly nameKo: string;
  readonly price: number;
  readonly className?: string;
}

export const CityCard: React.FC<CityCardProps> = ({ icon: Icon, nameKo, price, className }) => {
  return (
    <div
      className={clsx(
        'w-32 h-32 border-2 border-black text-center flex flex-col items-center justify-around p-2',
        className
      )}
    >
      <div>
        <Icon size={48} />
      </div>
      <div>
        <p className="text-[1.1rem] font-bold">{nameKo}</p>
        <p className="text-sm text-gray-400">{price.toLocaleString('ko-KR')} 원</p>
      </div>
      <div className="flex space-x-1 mt-1">
        <PlayerDot color="blue" />
        <PlayerDot color="yellow" />
        <PlayerDot color="green" />
        <PlayerDot color="red" />
      </div>
    </div>
  );
};
