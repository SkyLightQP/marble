import React from 'react';
import {
  RiBuildingLine,
  RiHome3Line,
  RiHotelLine,
  RiMoneyDollarBoxLine,
  RiMoneyDollarCircleLine,
  RiSquareLine
} from 'react-icons/ri';
import { BalanceInformationItem } from '../BalanceInformationItem';

export const BalanceInformationView: React.FC = () => {
  return (
    <div className="w-60 h-60 bg-white border-2 border-gray-300 rounded-xl p-4 ">
      <h1 className="font-bold text-xl mb-2 flex items-center">
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
