import clsx from 'clsx';
import React from 'react';
import { DiceItem } from '@/components/Dice/DiceItem';

interface DiceViewProps {
  readonly isMyTurn?: boolean;
  readonly onClick?: () => void;
  readonly firstDice: number;
  readonly secondDice: number;
}

export const DiceView: React.FC<DiceViewProps> = ({ isMyTurn, onClick, firstDice, secondDice }) => {
  return (
    <div
      className="flex h-60 w-60 flex-col items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-4"
      role="button"
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      tabIndex={0}
    >
      <div className={clsx('flex space-x-2', isMyTurn ? 'cursor-pointer' : 'cursor-no-drop')}>
        <DiceItem keyPrefix="first-dice" amount={firstDice} />
        <DiceItem keyPrefix="second-dice" amount={secondDice} />
      </div>
      {isMyTurn ? (
        <p className="mt-2 text-black font-bold">주사위를 눌러 턴을 시작하세요.</p>
      ) : (
        <p className="mt-2 text-gray-400">내 턴을 기다리는 중...</p>
      )}
    </div>
  );
};
