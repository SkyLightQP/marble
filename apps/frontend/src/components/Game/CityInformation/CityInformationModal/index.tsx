import { FC } from 'react';
import { CityType } from '@/api/SocketResponse';
import { Modal } from '@/components/Modal';

interface CityInformationModalProps {
  readonly isOpen: boolean;
  readonly close: () => void;
  readonly cityName: string;
  readonly price: {
    readonly land: number;
    readonly house: number;
    readonly building: number;
    readonly hotel: number;
  };
  readonly cityType: CityType[];
}

export const CityInformationModal: FC<CityInformationModalProps> = ({ isOpen, close, cityName, price, cityType }) => {
  const cityTypeKo = {
    land: '땅',
    house: '별장',
    building: '빌딩',
    hotel: '호텔'
  };

  let penalty = 0;
  if (cityType.includes('land')) penalty += price.land;
  if (cityType.includes('house')) penalty += price.house * 2;
  if (cityType.includes('building')) penalty += price.building * 2;
  if (cityType.includes('hotel')) penalty += price.hotel * 2;

  return (
    <Modal isOpen={isOpen} close={close} title={`${cityName} 정보`} width="700px" height="290px">
      <div className="mt-2 space-y-2">
        <p className="text-lg">
          현재 {cityType.map((i) => cityTypeKo[i]).join(', ')}
          {cityType.length === 1 ? '만' : '을(를)'} 보유 중입니다.
        </p>

        <div>
          <p className="text-lg">다른 사람이 이 도시에 오면 아래의 요금을 받습니다.</p>
          <p>요금: {penalty.toLocaleString('ko-KR')} 원</p>
        </div>

        <hr className="bg-gray-500" />

        <div>
          <p>
            <span className="inline-block w-16">땅 가격:</span> <span>{price.land.toLocaleString('ko-KR')} 원</span>
          </p>
          <p>
            <span className="inline-block w-16">별장 가격:</span> <span>{price.house.toLocaleString('ko-KR')} 원</span>
          </p>
          <p>
            <span className="inline-block w-16">빌딩 가격:</span>{' '}
            <span>{price.building.toLocaleString('ko-KR')} 원</span>
          </p>
          <p>
            <span className="inline-block w-16">호텔 가격:</span> <span>{price.hotel.toLocaleString('ko-KR')} 원</span>
          </p>
        </div>
      </div>
    </Modal>
  );
};
