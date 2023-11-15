import React from 'react';
import { CityCard } from '../components/CityCard';
import { DUMMY_CITY_LIST } from '../constants/dummy-data';

export const MainPage: React.FC = () => {
  return (
    <div>
      <div className="flex flex-row justify-center space-x-1">
        {DUMMY_CITY_LIST.map((city) => (
          <CityCard key={city.nameEn} nameKo={city.nameKo} nameEn={city.nameEn} price={city.price} />
        ))}
      </div>
      <div className="flex flex-row justify-center space-x-[62rem]">
        <div className="flex flex-col">
          {DUMMY_CITY_LIST.map((city) => (
            <CityCard
              className="-rotate-90 -mb-7 last:mb-0"
              key={city.nameEn}
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
              nameKo={city.nameKo}
              nameEn={city.nameEn}
              price={city.price}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-center space-x-1">
        {DUMMY_CITY_LIST.map((city) => (
          <CityCard key={city.nameEn} nameKo={city.nameKo} nameEn={city.nameEn} price={city.price} />
        ))}
      </div>
    </div>
  );
};
