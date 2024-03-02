import { FC } from 'react';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { cn } from '@/utils/cn';

interface CityBuyModalProps {
  readonly isOpen: boolean;
  readonly close: () => void;
  readonly cityName: string;
  readonly money: number;
  readonly price: {
    readonly land: number;
    readonly house: number;
    readonly building: number;
    readonly hotel: number;
  };
  readonly canBuyBuilding: boolean;
  readonly onBuyLand: () => void;
  readonly onBuyHouse: () => void;
  readonly onBuyBuilding: () => void;
  readonly onBuyHotel: () => void;
  readonly onClose: () => void;
}

export const CityBuyModal: FC<CityBuyModalProps> = ({
  isOpen,
  close,
  cityName,
  money,
  price,
  canBuyBuilding,
  onBuyLand,
  onBuyHouse,
  onBuyBuilding,
  onBuyHotel,
  onClose
}) => {
  const disableStyle = 'cursor-no-drop bg-gray-500 hover:bg-gray-500';

  return (
    <Modal isOpen={isOpen} close={close} title={`${cityName} 구입하기`} width="700px" height="330px" onClose={onClose}>
      <h2 className="text-lg">땅만 구입하거나 건물(별장, 빌딩, 호텔)을 함께 구입할 수 있습니다.</h2>
      <div className="mt-6 space-y-2">
        <p className="text-lg">보유 중인 현금: {money.toLocaleString('ko-KR')} 원</p>
        <div>
          <Button className={cn('w-52 h-12', money < price.land ? disableStyle : '')} onClick={onBuyLand}>
            땅 구입하기 ({price.land.toLocaleString('ko-KR')} 원)
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button
            className={cn('w-52 h-12', money < price.house || !canBuyBuilding ? disableStyle : '')}
            onClick={onBuyHouse}
          >
            별장 구입하기 ({price.house.toLocaleString('ko-KR')} 원)
          </Button>
          <Button
            className={cn('w-52 h-12', money < price.building || !canBuyBuilding ? disableStyle : '')}
            onClick={onBuyBuilding}
          >
            빌딩 구입하기 ({price.building.toLocaleString('ko-KR')} 원)
          </Button>
          <Button
            className={cn('w-52 h-12', money < price.hotel || !canBuyBuilding ? disableStyle : '')}
            onClick={onBuyHotel}
          >
            호텔 구입하기 ({price.hotel.toLocaleString('ko-KR')} 원)
          </Button>
        </div>
        <div>
          <p className="text-gray-500">* 건물을 구입하려면 먼저 땅을 구입해야 합니다.</p>
          <p className="text-gray-500">* 창을 닫으면 내 턴을 끝냅니다.</p>
        </div>
      </div>
    </Modal>
  );
};
