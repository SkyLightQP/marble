import { FC } from 'react';
import { Modal } from '@/components/Modal';
import { useAutoEndAction } from '@/services/useAutoEndAction';

interface PenaltyModalProps {
  readonly isOpen: boolean;
  readonly close: () => void;
  readonly ownerNickname: string;
  readonly penalty: number;
  readonly money: number;
  readonly onClose: () => void;
}

export const PenaltyModal: FC<PenaltyModalProps> = ({ isOpen, close, ownerNickname, penalty, money, onClose }) => {
  const { time, onOverrideClose } = useAutoEndAction(15, isOpen, close, onClose);

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      title={`${ownerNickname}의 땅입니다!`}
      width="700px"
      height="250px"
      onClose={onOverrideClose}
    >
      <h2 className="text-lg">벌금을 내야합니다. 보유 중인 금액이 부족하면 파산합니다.</h2>
      <div className="mt-6 space-y-2">
        <div>
          <p className="text-lg">보유 중인 현금: {money.toLocaleString('ko-KR')} 원</p>
          <p className="text-lg">벌금: {penalty.toLocaleString('ko-KR')} 원</p>
          <p className="text-xl text-red-500">
            {money < penalty
              ? '벌금을 낼 현금이 부족해 파산합니다.'
              : `벌금 낸 후 잔액: ${(money - penalty).toLocaleString('ko-KR')} 원`}
          </p>
        </div>
        <div>
          <p className="text-gray-500">* 창을 닫아 끝내거나 {time}초 뒤 자동으로 턴을 끝냅니다.</p>
        </div>
      </div>
    </Modal>
  );
};
