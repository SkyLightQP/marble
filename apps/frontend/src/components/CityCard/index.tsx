import clsx from 'clsx';
import React from 'react';
import { IconType } from 'react-icons';
import { RiBuildingLine, RiHome3Line, RiHotelLine, RiSquareLine } from 'react-icons/ri';
import { CityType } from '@/api/SocketResponse';
import { PlayerDot } from '@/components/PlayerDot';
import { DotItem } from '@/types/DotItem';

interface CityCardProps {
  readonly icon: IconType;
  readonly nameKo: string;
  readonly className?: string;
  readonly currentPlayers: DotItem[];
  readonly haveCities?: CityType[];
}

export const CityCard: React.FC<CityCardProps> = ({ icon: Icon, nameKo, className, currentPlayers, haveCities }) => {
  return (
    <div
      className={clsx(
        'flex h-32 w-32 flex-col items-center justify-around border-2 border-black p-2 text-center',
        className
      )}
    >
      <div className="mb-1 flex space-x-1">
        {(haveCities ?? []).map((cityType) => {
          if (cityType === 'land') return <RiSquareLine key={`${nameKo}-${cityType}`} size={16} />;
          if (cityType === 'house') return <RiHome3Line key={`${nameKo}-${cityType}`} size={16} />;
          if (cityType === 'building') return <RiBuildingLine key={`${nameKo}-${cityType}`} size={16} />;
          if (cityType === 'hotel') return <RiHotelLine key={`${nameKo}-${cityType}`} size={16} />;
          return <></>;
        })}
      </div>
      <div>
        <Icon size={38} />
      </div>
      <div className="flex items-center">
        <p className="text-[1.2rem] font-bold">{nameKo}</p>
      </div>
      <div className="mt-1 flex space-x-1">
        {currentPlayers.map((player) => (
          <PlayerDot key={`${nameKo}-${player.userId.slice(8)}`} color={player.color} />
        ))}
      </div>
    </div>
  );
};
