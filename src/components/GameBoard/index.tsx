import React from 'react';
import { RiBuildingLine } from 'react-icons/ri';
import { SpecialCard } from '../SpecialCard';
import { DUMMY_CITY_LIST } from '../../constants/dummy-data';
import { CityCard } from '../CityCard';

export const GameBoard: React.FC = () => {
  return (
    <div>
      <div className="flex flex-row justify-center space-x-1">
        <SpecialCard>
          <h1 className="font-bold text-2xl">START</h1>
        </SpecialCard>
        {DUMMY_CITY_LIST.map((city) => (
          <CityCard
            key={city.nameEn}
            icon={RiBuildingLine}
            nameKo={city.nameKo}
            nameEn={city.nameEn}
            price={city.price}
          />
        ))}
        <SpecialCard />
      </div>
      <div className="flex flex-row justify-center space-x-[1060px] mt-1 mb-1">
        <div className="flex flex-col space-y-1">
          {DUMMY_CITY_LIST.map((city) => (
            <CityCard
              key={city.nameEn}
              icon={RiBuildingLine}
              nameKo={city.nameKo}
              nameEn={city.nameEn}
              price={city.price}
            />
          ))}
        </div>
        <div className="flex flex-col space-y-1">
          {DUMMY_CITY_LIST.map((city) => (
            <CityCard
              key={city.nameEn}
              icon={RiBuildingLine}
              nameKo={city.nameKo}
              nameEn={city.nameEn}
              price={city.price}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-center space-x-1">
        <SpecialCard />
        {DUMMY_CITY_LIST.map((city) => (
          <CityCard
            key={city.nameEn}
            icon={RiBuildingLine}
            nameKo={city.nameKo}
            nameEn={city.nameEn}
            price={city.price}
          />
        ))}
        <SpecialCard />
      </div>
    </div>
  );
};
