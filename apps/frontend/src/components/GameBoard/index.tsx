import api from '@marble/api';
import React, { useEffect, useMemo, useState } from 'react';
import { RiBuildingLine, RiFlagLine, RiQuestionLine } from 'react-icons/ri';
import { apiConnection } from '@/api';
import { BalanceInformationView } from '@/components/BalanceInformation/BalanceInformationView';
import { CityCard } from '@/components/CityCard';
import { DiceView } from '@/components/Dice/DiceView';
import { RankView } from '@/components/Rank/RankView';
import { SpecialCard } from '../SpecialCard';

export const GameBoard: React.FC = () => {
  const [cities, setCities] = useState<Awaited<ReturnType<typeof api.functional.city.getCities>>>([]);

  useEffect(() => {
    api.functional.city.getCities(apiConnection).then((res) => {
      setCities(res);
    });
  }, []);

  const topLine = useMemo(() => cities.slice(0, 8), [cities]);
  const leftLine = useMemo(() => cities.slice(8, 13), [cities]);
  const rightLine = useMemo(() => cities.slice(13, 18), [cities]);
  const bottomLine = useMemo(() => cities.slice(18, 26), [cities]);

  return (
    <div>
      <div className="flex flex-row justify-center space-x-1">
        <SpecialCard>
          <h1 className="flex items-center text-2xl font-bold">
            <RiFlagLine className="mr-1" /> 출발
          </h1>
        </SpecialCard>
        {topLine.map((city) => (
          <CityCard key={city.id} icon={RiBuildingLine} nameKo={city.name} price={city.cityPrices[0].landPrice} />
        ))}
        <SpecialCard>
          <h1 className="flex items-center text-2xl font-bold">
            <RiQuestionLine className="mr-1" /> ?
          </h1>
        </SpecialCard>
      </div>
      <div className="mb-1 mt-1 flex flex-row justify-center">
        <div className="flex flex-col space-y-1">
          {leftLine.map((city) => (
            <CityCard key={city.id} icon={RiBuildingLine} nameKo={city.name} price={city.cityPrices[0].landPrice} />
          ))}
        </div>
        <div className="flex h-full w-[1060px] justify-center space-x-4 p-10">
          <RankView />
          <BalanceInformationView />
          <DiceView />
        </div>
        <div className="flex flex-col space-y-1">
          {rightLine.map((city) => (
            <CityCard key={city.id} icon={RiBuildingLine} nameKo={city.name} price={city.cityPrices[0].landPrice} />
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-center space-x-1">
        <SpecialCard>
          <h1 className="flex items-center text-2xl font-bold">
            <RiQuestionLine className="mr-1" /> ?
          </h1>
        </SpecialCard>
        {bottomLine.map((city) => (
          <CityCard key={city.id} icon={RiBuildingLine} nameKo={city.name} price={city.cityPrices[0].landPrice} />
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
