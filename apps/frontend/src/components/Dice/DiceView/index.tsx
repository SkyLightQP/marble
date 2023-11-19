import React from 'react';
import clsx from 'clsx';

interface DiceViewProps {
  readonly isMyTurn?: boolean;
}

export const DiceView: React.FC<DiceViewProps> = ({ isMyTurn }) => {
  return (
    <div className="w-60 h-60 bg-white border-2 border-gray-300 rounded-xl p-4 flex flex-col justify-center items-center">
      <div className={clsx('flex space-x-2', isMyTurn ? 'cursor-pointer' : 'cursor-no-drop')}>
        <div className="w-24 h-24 border-2 border-black rounded-xl flex flex-col justify-center items-center space-y-4">
          <div className="w-4 h-4 rounded-full bg-black" />
        </div>
        <div className="w-24 h-24 border-2 border-black rounded-xl flex flex-col justify-center items-center space-y-4">
          <div className="flex space-x-4">
            <div className="w-4 h-4 rounded-full bg-black" />
            <div className="w-4 h-4 rounded-full bg-black" />
          </div>
          <div className="flex space-x-4">
            <div className="w-4 h-4 rounded-full bg-black" />
            <div className="w-4 h-4 rounded-full bg-black" />
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
