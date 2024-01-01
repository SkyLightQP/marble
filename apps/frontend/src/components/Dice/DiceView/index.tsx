import clsx from 'clsx';
import React from 'react';

interface DiceViewProps {
  readonly isMyTurn?: boolean;
}

export const DiceView: React.FC<DiceViewProps> = ({ isMyTurn }) => {
  return (
    <div className="flex h-60 w-60 flex-col items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-4">
      <div className={clsx('flex space-x-2', isMyTurn ? 'cursor-pointer' : 'cursor-no-drop')}>
        <div className="flex h-24 w-24 flex-col items-center justify-center space-y-4 rounded-xl border-2 border-black">
          <div className="h-4 w-4 rounded-full bg-black" />
        </div>
        <div className="flex h-24 w-24 flex-col items-center justify-center space-y-4 rounded-xl border-2 border-black">
          <div className="flex space-x-4">
            <div className="h-4 w-4 rounded-full bg-black" />
            <div className="h-4 w-4 rounded-full bg-black" />
          </div>
          <div className="flex space-x-4">
            <div className="h-4 w-4 rounded-full bg-black" />
            <div className="h-4 w-4 rounded-full bg-black" />
          </div>
        </div>
      </div>
      {isMyTurn ? (
        <p className="mt-2 text-gray-400">주사위를 눌러 턴을 시작하세요.</p>
      ) : (
        <p className="mt-2 text-gray-400">내 턴을 기다리는 중...</p>
      )}
    </div>
  );
};
