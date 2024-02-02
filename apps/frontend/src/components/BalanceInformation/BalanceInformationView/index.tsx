import { FC } from 'react';
import {
  RiBuildingLine,
  RiHome3Line,
  RiHotelLine,
  RiMoneyDollarBoxLine,
  RiMoneyDollarCircleLine,
  RiSquareLine
} from 'react-icons/ri';
import { BalanceInformationItem } from '@/components/BalanceInformation/BalanceInformationItem';

export interface BalanceInfo {
  readonly money: number;
  readonly land: number;
  readonly house: number;
  readonly building: number;
  readonly hotel: number;
}

interface BalanceInformationViewProps {
  readonly balanceInfo: BalanceInfo;
}

export const BalanceInformationView: FC<BalanceInformationViewProps> = ({ balanceInfo }) => {
  return (
    <div className="h-60 w-60 rounded-xl border-2 border-gray-300 bg-white p-4 ">
      <h1 className="mb-2 flex items-center text-xl font-bold">
        <RiMoneyDollarCircleLine className="mr-1" />
        보유 자산
      </h1>
      <div className="space-y-1">
        <BalanceInformationItem icon={RiMoneyDollarBoxLine} text="현금" cost={balanceInfo.money} unit="원" />
        <BalanceInformationItem icon={RiSquareLine} text="빈땅" cost={balanceInfo.land} unit="필" />
        <BalanceInformationItem icon={RiHome3Line} text="별장" cost={balanceInfo.house} unit="채" />
        <BalanceInformationItem icon={RiBuildingLine} text="빌딩" cost={balanceInfo.building} unit="채" />
        <BalanceInformationItem icon={RiHotelLine} text="호텔" cost={balanceInfo.hotel} unit="채" />
      </div>
    </div>
  );
};
