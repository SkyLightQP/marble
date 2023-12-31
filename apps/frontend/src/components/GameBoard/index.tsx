import React from 'react';
import { RiBuildingLine, RiFlagLine, RiQuestionLine } from 'react-icons/ri';
import { SpecialCard } from '../SpecialCard';
import { DUMMY_CITY_LIST, DUMMY_CITY_LIST_FOR_VERTICAL } from '@/constants/dummy-data';
import { CityCard } from '@/components/CityCard';
import { RankView } from '@/components/Rank/RankView';
import { BalanceInformationView } from '@/components/BalanceInformation/BalanceInformationView';
import { DiceView } from '@/components/Dice/DiceView';

export const GameBoard: React.FC = () => {
  return (
    <div>
      <div className="flex flex-row justify-center space-x-1">
        <SpecialCard>
          <h1 className="flex items-center text-2xl font-bold">
            <RiFlagLine className="mr-1" /> 출발
          </h1>
        </SpecialCard>
        {DUMMY_CITY_LIST.map((city) => (
          <CityCard key={city.nameKo} icon={RiBuildingLine} nameKo={city.nameKo} price={city.price} />
        ))}
        <SpecialCard>
          <h1 className="flex items-center text-2xl font-bold">
            <RiQuestionLine className="mr-1" /> ?
          </h1>
        </SpecialCard>
      </div>
      <div className="mb-1 mt-1 flex flex-row justify-center">
        <div className="flex flex-col space-y-1">
          {DUMMY_CITY_LIST_FOR_VERTICAL.map((city) => (
            <CityCard key={city.nameKo} icon={RiBuildingLine} nameKo={city.nameKo} price={city.price} />
          ))}
        </div>
        <div className="flex h-full w-[1060px] justify-center space-x-4 p-10">
          <RankView />
          <BalanceInformationView />
          <DiceView />
        </div>
        <div className="flex flex-col space-y-1">
          {DUMMY_CITY_LIST_FOR_VERTICAL.map((city) => (
            <CityCard key={city.nameKo} icon={RiBuildingLine} nameKo={city.nameKo} price={city.price} />
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-center space-x-1">
        <SpecialCard>
          <h1 className="flex items-center text-2xl font-bold">
            <RiQuestionLine className="mr-1" /> ?
          </h1>
        </SpecialCard>
        {DUMMY_CITY_LIST.map((city) => (
          <CityCard key={city.nameKo} icon={RiBuildingLine} nameKo={city.nameKo} price={city.price} />
        ))}
        <SpecialCard>
          <h1 className="flex items-center text-2xl font-bold">
            <RiQuestionLine className="mr-1" /> ?
          </h1>
        </SpecialCard>
      </div>
    </div>
  );
};
