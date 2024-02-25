import { FC } from 'react';
import { RiTrophyLine } from 'react-icons/ri';
import { Modal } from '@/components/Modal';

interface GameEndModalProps {
  readonly isOpen: boolean;
  readonly close: () => void;
  readonly ranks: Array<{
    readonly rank: number;
    readonly nickname: string;
    readonly money: number;
  }>;
  readonly onClose: () => void;
}

export const GameEndModal: FC<GameEndModalProps> = ({ isOpen, close, ranks, onClose }) => {
  return (
    <Modal isOpen={isOpen} close={close} title="게임 결과" width="600px" height="400px" onClose={onClose}>
      <div className="mt-4">
        <h1 className="text-2xl font-bold text-center mb-6">남은 플레이어가 1명이어서 게임을 종료합니다</h1>
        <div className="flex flex-col items-center">
          <h3 className="flex items-center text-xl font-bold mb-2">
            <RiTrophyLine className="mr-1" /> 최종 순위
          </h3>
          <table>
            <thead className="border-b-2">
              <tr>
                <th className="text-center w-10">순위</th>
                <th className="text-center w-20">닉네임</th>
                <th className="text-center w-32">돈</th>
              </tr>
            </thead>
            <tbody>
              {ranks.map((rank) => (
                <tr key={`final_rank-${rank.rank}-${rank.nickname}`} className="font-bold">
                  <td className="text-center w-10">#{rank.rank}</td>
                  <td className="text-center w-20">{rank.nickname}</td>
                  <td className="text-center w-32">{rank.money.toLocaleString('ko-KR')} 원</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-14">
          <p className="text-gray-500">* 창을 닫으면 게임 준비 화면으로 돌아갑니다.</p>
        </div>
      </div>
    </Modal>
  );
};
