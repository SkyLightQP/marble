import clsx from 'clsx';
import React from 'react';
import { RiBuildingLine } from 'react-icons/ri';

interface CityCardProps {
  readonly nameKo: string;
  readonly nameEn: string;
  readonly price: number;
  readonly className?: string;
}

export const CityCard: React.FC<CityCardProps> = ({ nameKo, nameEn, price, className }) => {
  return (
    <div
      className={clsx(
        'w-28 h-40 border-2 border-black text-center flex flex-col items-center justify-around p-2',
        className
      )}
    >
      <div>
        <RiBuildingLine size={48} />
      </div>
      <div>
        <p className="text-[1.2rem]">{nameKo}</p>
        <p className="text-lg">{nameEn}</p>
        <p className="text-sm text-gray-400">{price.toLocaleString('ko-KR')} 원</p>
      </div>
    </div>
  );
};
