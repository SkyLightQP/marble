import api from '@marble/api';
import { FC, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { RiBuildingLine, RiFlagLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import { apiConnection } from '@/api';
import { BuyCityResponse, PenaltyResponse, RequestBuyCityResponse } from '@/api/SocketResponse';
import { BalanceInformationView } from '@/components/Game/BalanceInformation/BalanceInformationView';
import { CityBuyModal } from '@/components/Game/CityBuyModal';
import { CityCard } from '@/components/Game/CityCard';
import { CityInformationView } from '@/components/Game/CityInformation/CityInformationView';
import { DiceView } from '@/components/Game/Dice/DiceView';
import { PenaltyModal } from '@/components/Game/PenaltyModal';
import { RankView } from '@/components/Game/Rank/RankView';
import { SpecialCard } from '@/components/Game/SpecialCard';
import { Loading } from '@/components/Loading';
import { useSocket } from '@/hooks/useSocket';
import { useSocketListener } from '@/hooks/useSocketListener';
import { useUser } from '@/hooks/useUser';
import { useGameStore } from '@/stores/useGameStore';
import { useModalStore } from '@/stores/useModalStore';
import { DotItem } from '@/types/DotItem';
import { RankItem } from '@/types/Rank';
import { range } from '@/utils/Range';

type CityStateType = Awaited<ReturnType<typeof api.functional.city.group.position.getCitiesGroupByPosition>>;

interface GameBoardProps {
  readonly isMyTurn: boolean;
  readonly ranks: RankItem[];
  readonly positions: Record<string, DotItem[]>;
}

export const GameBoard: FC<GameBoardProps> = ({ isMyTurn, ranks, positions }) => {
  const [cities, setCities] = useState<CityStateType>({});
  const [dice, setDice] = useState<number[]>([1, 1]);
  const game = useGameStore();
  const { openModal, updateContext } = useModalStore();
  const userId = useUser();
  const socket = useSocket();
  const { roomId } = useParams();

  useEffect(() => {
    api.functional.city.group.position.getCitiesGroupByPosition(apiConnection).then(setCities);
  }, []);

  const onDiceClick = () => {
    if (!isMyTurn) return;
    socket?.emit('roll-dice', { roomId });
  };

  const getCityIconsByPosition = useCallback(
    (position: number) => {
      const cityId = cities[position][0].id;
      if (game.playerStatus[game.cityWhoHave[cityId]] === undefined) return [];
      return game.playerStatus[game.cityWhoHave[cityId]].haveCities[cityId] ?? [];
    },
    [game, cities]
  );

  const getCityOwnerColorByPosition = useCallback(
    (position: number) => {
      const cityId = cities[position][0].id;
      return game.playerStatus[game.cityWhoHave[cityId]]?.color ?? undefined;
    },
    [game, cities]
  );

  useSocketListener<number[]>('roll-dice', (data) => {
    toast(`🎲 ${data[0] + data[1]}칸 이동합니다!`);
    setDice(data);
  });
  useSocketListener<RequestBuyCityResponse>('request-buy-city', (data) => {
    if (userId === undefined) return;
    const { id: cityId, name, cityPrices } = data.city;
    const { landPrice, housePrice, buildingPrice, hotelPrice } = cityPrices[0];
    const playerHaveCities = game.playerStatus[userId].haveCities;
    const canBuyBuilding = playerHaveCities[cityId] && playerHaveCities[cityId].includes('land');
    openModal(CityBuyModal, {
      cityName: name,
      money: game.playerStatus[userId].money ?? 0,
      price: {
        land: landPrice,
        house: housePrice,
        building: buildingPrice,
        hotel: hotelPrice
      },
      canBuyBuilding,
      onBuyLand: () => socket?.emit('buy-city', { roomId, cityId, cityType: 'land' }),
      onBuyHouse: () => socket?.emit('buy-city', { roomId, cityId, cityType: 'house' }),
      onBuyBuilding: () => socket?.emit('buy-city', { roomId, cityId, cityType: 'building' }),
      onBuyHotel: () => socket?.emit('buy-city', { roomId, cityId, cityType: 'hotel' }),
      onClose: () => socket?.emit('end-turn', { roomId })
    });
  });
  useSocketListener<BuyCityResponse>('buy-city', (data) => {
    game.setState(data.game);
    if (userId === undefined) return;
    updateContext(CityBuyModal, {
      money: data.game.playerStatus[userId].money,
      canBuyBuilding: data.game.playerStatus[userId].haveCities[data.city.id].includes('land')
    });
  });
  useSocketListener<PenaltyResponse>('penalty', (data) => {
    if (userId === undefined) return;
    openModal(PenaltyModal, {
      ownerNickname: data.ownerNickname,
      money: game.playerStatus[userId].money,
      penalty: data.penalty,
      onClose: () => socket?.emit('end-turn', { roomId })
    });
  });

  if (!game.isLoading || userId === undefined || cities === undefined || cities[1] === undefined) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex flex-row justify-center space-x-1">
        <SpecialCard currentPlayers={positions[0] ?? []}>
          <h1 className="flex items-center text-2xl font-bold">
            <RiFlagLine className="mr-1" /> 출발
          </h1>
        </SpecialCard>
        {range(1, 9).map((i) => (
          <CityCard
            key={cities[i][0].id}
            icon={RiBuildingLine}
            nameKo={cities[i][0].name}
            cityOwnerColor={getCityOwnerColorByPosition(i)}
            haveCities={getCityIconsByPosition(i)}
            currentPlayers={positions[i] ?? []}
          />
        ))}
        <SpecialCard currentPlayers={positions[9] ?? []} />
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
                cityOwnerColor={getCityOwnerColorByPosition(i)}
                haveCities={getCityIconsByPosition(i)}
                currentPlayers={positions[i] ?? []}
              />
            ))}
        </div>
        <div className="flex flex-col min-h-full w-[1060px] justify-center items-center p-10 space-y-4">
          <div className="flex justify-center space-x-4">
            <CityInformationView haveCities={game.playerStatus[userId].haveCities} cities={cities} />
            <BalanceInformationView
              balanceInfo={{
                money: game.playerStatus[userId].money,
                land: game.playerStatus[userId].land,
                house: game.playerStatus[userId].house,
                building: game.playerStatus[userId].building,
                hotel: game.playerStatus[userId].hotel
              }}
            />
            <DiceView isMyTurn={isMyTurn} onClick={onDiceClick} firstDice={dice[0]} secondDice={dice[1]} />
          </div>
          <div className="flex justify-center space-x-4">
            <RankView ranks={ranks} />
            <div className="h-60 w-[31rem] rounded-xl border-2 border-gray-300 bg-white p-4">
              <p>채팅</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          {range(10, 15).map((i) => (
            <CityCard
              key={cities[i][0].id}
              icon={RiBuildingLine}
              nameKo={cities[i][0].name}
              cityOwnerColor={getCityOwnerColorByPosition(i)}
              haveCities={getCityIconsByPosition(i)}
              currentPlayers={positions[i] ?? []}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-center space-x-1">
        <SpecialCard currentPlayers={positions[24] ?? []} />
        {range(16, 24)
          .slice()
          .reverse()
          .map((i) => (
            <CityCard
              key={cities[i][0].id}
              icon={RiBuildingLine}
              nameKo={cities[i][0].name}
              cityOwnerColor={getCityOwnerColorByPosition(i)}
              haveCities={getCityIconsByPosition(i)}
              currentPlayers={positions[i] ?? []}
            />
          ))}
        <SpecialCard currentPlayers={positions[15] ?? []} />
      </div>
    </div>
  );
};
