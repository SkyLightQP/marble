import React from 'react';
import {
  RiBuildingLine,
  RiHome3Line,
  RiHotelLine,
  RiMoneyDollarBoxLine,
  RiMoneyDollarCircleLine,
  RiSquareLine
} from 'react-icons/ri';
import { BalanceInformationItem } from '@/components/BalanceInformation/BalanceInformationItem';

export const BalanceInformationView: React.FC = () => {
  return (
    <div className="h-60 w-60 rounded-xl border-2 border-gray-300 bg-white p-4 ">
      <h1 className="mb-2 flex items-center text-xl font-bold">
        <RiMoneyDollarCircleLine className="mr-1" />
        보유 자산
      </h1>
      <div className="space-y-1">
        <BalanceInformationItem icon={RiMoneyDollarBoxLine} text="현금" cost={1000} unit="원" />
        <BalanceInformationItem icon={RiSquareLine} text="빈땅" cost={10} unit="필" />
        <BalanceInformationItem icon={RiHome3Line} text="별장" cost={10} unit="채" />
        <BalanceInformationItem icon={RiBuildingLine} text="빌딩" cost={10} unit="채" />
        <BalanceInformationItem icon={RiHotelLine} text="호텔" cost={10} unit="채" />
      </div>
    </div>
  );
};
