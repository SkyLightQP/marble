import React from 'react';
import { IconType } from 'react-icons';

interface BalanceInformationItemProps {
  readonly icon: IconType;
  readonly text: string;
  readonly cost: number;
  readonly unit: string;
}

export const BalanceInformationItem: React.FC<BalanceInformationItemProps> = ({ icon: Icon, text, cost, unit }) => {
  return (
    <div className="flex items-center">
      <Icon size={24} className="mr-1" />
      {text}: {cost.toLocaleString('ko-KR')} {unit}
    </div>
  );
};
