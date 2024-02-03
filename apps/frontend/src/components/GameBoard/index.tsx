import api from '@marble/api';
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { RiBuildingLine, RiFlagLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import { apiConnection } from '@/api';
import { BalanceInfo, BalanceInformationView } from '@/components/BalanceInformation/BalanceInformationView';
import { CityCard } from '@/components/CityCard';
import { DiceView } from '@/components/Dice/DiceView';
import { RankView } from '@/components/Rank/RankView';
import { SpecialCard } from '@/components/SpecialCard';
import { useSocket } from '@/hooks/useSocket';
import { useSocketListener } from '@/hooks/useSocketListener';
import { DotItem } from '@/types/DotItem';
import { RankItem } from '@/types/Rank';
import { range } from '@/utils/Range';

interface GameBoardProps {
  readonly playerPositions: Record<string, DotItem[]>;
  readonly isMyTurn: boolean;
  readonly ranks: RankItem[];
  readonly balanceInfo: BalanceInfo;
}

export const GameBoard: FC<GameBoardProps> = ({ playerPositions, isMyTurn, ranks, balanceInfo }) => {
  const [cities, setCities] = useState<
    Awaited<ReturnType<typeof api.functional.city.group.position.getCitiesGroupByPosition>>
  >({});
  const [dice, setDice] = useState<number[]>([1, 1]);
  const { roomId } = useParams();
  const socket = useSocket();

  useEffect(() => {
    api.functional.city.group.position.getCitiesGroupByPosition(apiConnection).then((res) => {
      setCities(res);
    });
  }, []);

  const onDiceClick = () => {
    if (!isMyTurn) return;
    socket?.emit('roll-dice', { roomId });
  };

  useSocketListener<number[]>('roll-dice', (data) => {
    toast(`🎲 ${data[0] + data[1]}칸 이동합니다!`);
    setDice(data);
  });

  if (cities === undefined || cities[1] === undefined) {
    return (
      <div>
        <h1>도시를 가져오는 중...</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row justify-center space-x-1">
        <SpecialCard currentPlayers={playerPositions[0] ?? []}>
          <h1 className="flex items-center text-2xl font-bold">
            <RiFlagLine className="mr-1" /> 출발
          </h1>
        </SpecialCard>
        {range(1, 9).map((i) => (
          <CityCard
            key={cities[i][0].id}
            icon={RiBuildingLine}
            nameKo={cities[i][0].name}
            price={cities[i][0].cityPrices[0].landPrice}
            currentPlayers={playerPositions[i] ?? []}
          />
        ))}
        <SpecialCard currentPlayers={playerPositions[9] ?? []} />
      </div>
      <div className="mb-1 mt-1 flex flex-row justify-center">
        <div className="flex flex-col space-y-1">
          {range(25, 30)
            .slice()
            .reverse()
            .map((i) => (
              <CityCard
                key={cities[i][0].id}
                icon={RiBuildingLine}
                nameKo={cities[i][0].name}
                price={cities[i][0].cityPrices[0].landPrice}
                currentPlayers={playerPositions[i] ?? []}
              />
            ))}
        </div>
        <div className="flex h-full w-[1060px] justify-center space-x-4 p-10">
          <RankView ranks={ranks} />
          <BalanceInformationView balanceInfo={balanceInfo} />
          <DiceView isMyTurn={isMyTurn} onClick={onDiceClick} firstDice={dice[0]} secondDice={dice[1]} />
        </div>
        <div className="flex flex-col space-y-1">
          {range(10, 15).map((i) => (
            <CityCard
              key={cities[i][0].id}
              icon={RiBuildingLine}
              nameKo={cities[i][0].name}
              price={cities[i][0].cityPrices[0].landPrice}
              currentPlayers={playerPositions[i] ?? []}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-center space-x-1">
        <SpecialCard currentPlayers={playerPositions[24] ?? []} />
        {range(16, 24)
          .slice()
          .reverse()
          .map((i) => (
            <CityCard
              key={cities[i][0].id}
              icon={RiBuildingLine}
              nameKo={cities[i][0].name}
              price={cities[i][0].cityPrices[0].landPrice}
              currentPlayers={playerPositions[i] ?? []}
            />
          ))}
        <SpecialCard currentPlayers={playerPositions[15] ?? []} />
      </div>
    </div>
  );
};
