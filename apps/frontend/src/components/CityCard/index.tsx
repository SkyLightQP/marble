import clsx from 'clsx';
import React from 'react';
import { IconType } from 'react-icons';
import { PlayerDot } from '@/components/PlayerDot';
import { DotItem } from '@/types/DotItem';

interface CityCardProps {
  readonly icon: IconType;
  readonly nameKo: string;
  readonly price: number;
  readonly className?: string;
  readonly currentPlayers: DotItem[];
}

export const CityCard: React.FC<CityCardProps> = ({ icon: Icon, nameKo, price, className, currentPlayers }) => {
  return (
    <div
      className={clsx(
        'flex h-32 w-32 flex-col items-center justify-around border-2 border-black p-2 text-center',
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
      <div className="mt-1 flex space-x-1">
        {currentPlayers.map((player) => (
          <PlayerDot key={`${nameKo}-${player.userId.slice(8)}`} color={player.color} />
        ))}
      </div>
    </div>
  );
};
