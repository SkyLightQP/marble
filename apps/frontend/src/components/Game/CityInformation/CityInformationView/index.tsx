import api from '@marble/api';
import { FC, useMemo } from 'react';
import { RiBuildingLine } from 'react-icons/ri';
import { CityType } from '@/api/SocketResponse';
import { CityInformationModal } from '@/components/Game/CityInformation/CityInformationModal';
import { useModalStore } from '@/stores/useModalStore';

interface CityPriceType {
  readonly id: number;
  readonly cityId: number;
  readonly landPrice: number;
  readonly housePrice: number;
  readonly buildingPrice: number;
  readonly hotelPrice: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

interface CityInformationViewProps {
  readonly haveCities: Record<number, CityType[]>;
  readonly cities: Awaited<ReturnType<typeof api.functional.city.group.position.getCitiesGroupByPosition>>;
}

export const CityInformationView: FC<CityInformationViewProps> = ({ haveCities, cities }) => {
  const { openModal } = useModalStore();
  const cityInfo = useMemo(() => {
    return Object.values(cities)
      .map((i) => i[0])
      .reduce(
        (acc, cur) => ({
          ...acc,
          [cur.id]: {
            name: cur.name,
            price: cur.cityPrices[0]
          }
        }),
        {} as Record<number, { name: string; price: CityPriceType }>
      );
  }, [cities]);

  const renderCityList = useMemo(() => {
    const onCityClick = (cityId: number, cityType: CityType[]) => {
      openModal(CityInformationModal, {
        cityName: cityInfo[cityId].name,
        cityType,
        price: {
          land: cityInfo[cityId].price.landPrice,
          house: cityInfo[cityId].price.housePrice,
          building: cityInfo[cityId].price.buildingPrice,
          hotel: cityInfo[cityId].price.hotelPrice
        }
      });
    };

    return Object.entries(haveCities).map(([cityId, cityType]) => (
      <li key={cityId} className="w-[45px] cursor-pointer hover:text-blue-500 hover:underline">
        <div
          role="button"
          onClick={() => onCityClick(+cityId, cityType)}
          onKeyDown={(e) => e.key === 'Enter' && onCityClick(+cityId, cityType)}
          tabIndex={0}
        >
          {cityInfo[+cityId].name}
        </div>
      </li>
    ));
  }, [cityInfo, haveCities, openModal]);

  return (
    <div className="h-60 w-60 rounded-xl border-2 border-gray-300 bg-white p-4">
      <h1 className="mb-2 flex items-center text-xl font-bold">
        <RiBuildingLine className="mr-1" />
        보유 중인 도시 및 건물
      </h1>
      <div className="flex space-x-7">
        <ul className="list-disc ml-5 space-y-1">{renderCityList.slice(0, 6).map((i) => i)}</ul>
        <ul className="list-disc ml-5 space-y-1">{renderCityList.slice(6, 12).map((i) => i)}</ul>
        <ul className="list-disc ml-5 space-y-1">{renderCityList.slice(12, 18).map((i) => i)}</ul>
      </div>
    </div>
  );
};
