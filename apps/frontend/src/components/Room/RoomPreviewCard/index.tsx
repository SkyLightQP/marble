import React from 'react';
import clsx from 'clsx';

interface RoomPreviewCardProps {
  readonly isPlaying?: boolean;
  readonly name: string;
  readonly currentPlayer: number;
  readonly maxPlayer: number;
}

export const RoomPreviewCard: React.FC<RoomPreviewCardProps> = ({ isPlaying, name, currentPlayer, maxPlayer }) => {
  const playStyle = isPlaying
    ? 'border-t-red-500 cursor-no-drop'
    : 'border-t-blue-500 cursor-pointer hover:bg-gray-100';

  return (
    <div
      className={clsx(
        'w-80 h-24 bg-white border-2 rounded-md border-gray-300 border-t-4 p-3 flex flex-col justify-center',
        playStyle
      )}
    >
      <div className="flex justify-between">
        <h3 className="font-bold text-xl truncate">{name}</h3>
        <p className="text-gray-400">
          ({currentPlayer}/{maxPlayer})
        </p>
      </div>
      <p className="font-bold text-2xl">{isPlaying ? '게임 중' : '게임 대기'}</p>
    </div>
  );
};
