import React from 'react';
import { RiBuildingLine } from 'react-icons/ri';
import { CityCard } from '../components/CityCard';
import { DUMMY_CITY_LIST } from '../constants/dummy-data';
import { SpecialCard } from '../components/SpecialCard';

export const MainPage: React.FC = () => {
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
      <div className="flex flex-row justify-center space-x-[964px]">
        <div className="flex flex-col">
          {DUMMY_CITY_LIST.map((city) => (
            <CityCard
              className="-rotate-90 -mb-7 last:mb-0"
              key={city.nameEn}
              icon={RiBuildingLine}
              nameKo={city.nameKo}
              nameEn={city.nameEn}
              price={city.price}
            />
          ))}
        </div>
        <div className="flex flex-col">
          {DUMMY_CITY_LIST.map((city) => (
            <CityCard
              className="rotate-90 -mb-7 last:mb-0"
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
