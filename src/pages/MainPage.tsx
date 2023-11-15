import React from 'react';
import { CityCard } from '../components/CityCard';
import { DUMMY_CITY_LIST } from '../constants/dummy-data';

export const MainPage: React.FC = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute w-full h-full flex flex-col justify-between items-center">
        <div className="flex space-x-1 -mt-6">
          {DUMMY_CITY_LIST.map((city) => (
            <CityCard key={city.nameEn} nameKo={city.nameKo} nameEn={city.nameEn} price={city.price} />
          ))}
        </div>
        <div className="flex space-x-1 -mb-6">
          {DUMMY_CITY_LIST.map((city) => (
            <CityCard key={city.nameEn} nameKo={city.nameKo} nameEn={city.nameEn} price={city.price} />
          ))}
        </div>
      </div>
      <div className="absolute w-full h-full flex flex-row justify-around items-center">
        <div className="flex flex-col -ml-48">
          {DUMMY_CITY_LIST.map((city) => (
            <CityCard
              className="-rotate-90 -mb-11 last:mb-0"
              key={city.nameEn}
              nameKo={city.nameKo}
              nameEn={city.nameEn}
              price={city.price}
            />
          ))}
        </div>
        <div className="flex flex-col -mr-48">
          {DUMMY_CITY_LIST.map((city) => (
            <CityCard
              className="rotate-90 -mb-11 last:mb-0"
              key={city.nameEn}
              nameKo={city.nameKo}
              nameEn={city.nameEn}
              price={city.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
