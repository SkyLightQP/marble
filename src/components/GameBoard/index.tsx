import React from 'react';
import { RiBuildingLine, RiFlagLine, RiQuestionLine } from 'react-icons/ri';
import { SpecialCard } from '../SpecialCard';
import { DUMMY_CITY_LIST, DUMMY_CITY_LIST_FOR_VERTICAL } from '../../constants/dummy-data';
import { CityCard } from '../CityCard';
import { RankView } from '../Rank/RankView';
import { BalanceInformationView } from '../BalanceInformation/BalanceInformationView';

export const GameBoard: React.FC = () => {
  return (
    <div>
      <div className="flex flex-row justify-center space-x-1">
        <SpecialCard>
          <h1 className="font-bold text-2xl flex items-center">
            <RiFlagLine className="mr-1" /> 출발
          </h1>
        </SpecialCard>
        {DUMMY_CITY_LIST.map((city) => (
          <CityCard key={city.nameKo} icon={RiBuildingLine} nameKo={city.nameKo} price={city.price} />
        ))}
        <SpecialCard>
          <h1 className="font-bold text-2xl flex items-center">
            <RiQuestionLine className="mr-1" /> ?
          </h1>
        </SpecialCard>
      </div>
      <div className="flex flex-row justify-center mt-1 mb-1">
        <div className="flex flex-col space-y-1">
          {DUMMY_CITY_LIST_FOR_VERTICAL.map((city) => (
            <CityCard key={city.nameKo} icon={RiBuildingLine} nameKo={city.nameKo} price={city.price} />
          ))}
        </div>
        <div className="w-[1060px] h-full flex space-x-4 p-10">
          <RankView />
          <BalanceInformationView />
        </div>
        <div className="flex flex-col space-y-1">
          {DUMMY_CITY_LIST_FOR_VERTICAL.map((city) => (
            <CityCard key={city.nameKo} icon={RiBuildingLine} nameKo={city.nameKo} price={city.price} />
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-center space-x-1">
        <SpecialCard>
          <h1 className="font-bold text-2xl flex items-center">
            <RiQuestionLine className="mr-1" /> ?
          </h1>
        </SpecialCard>
        {DUMMY_CITY_LIST.map((city) => (
          <CityCard key={city.nameKo} icon={RiBuildingLine} nameKo={city.nameKo} price={city.price} />
        ))}
        <SpecialCard>
          <h1 className="font-bold text-2xl flex items-center">
            <RiQuestionLine className="mr-1" /> ?
          </h1>
        </SpecialCard>
      </div>
    </div>
  );
};
