import clsx from 'clsx';
import React from 'react';

interface RoomPreviewCardProps {
  readonly isPlaying?: boolean;
  readonly name: string;
  readonly currentPlayer: number;
  readonly maxPlayer: number;
  readonly onClick?: () => void;
}

export const RoomPreviewCard: React.FC<RoomPreviewCardProps> = ({
  isPlaying,
  name,
  currentPlayer,
  maxPlayer,
  onClick
}) => {
  const playStyle = isPlaying
    ? 'border-t-red-500 cursor-no-drop'
    : 'border-t-blue-500 cursor-pointer hover:bg-gray-100';

  return (
    <div
      className={clsx(
        'flex h-24 w-80 flex-col justify-center rounded-md border-2 border-t-4 border-gray-300 bg-white p-3',
        playStyle
      )}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between">
        <h3 className="truncate text-xl font-bold">{name}</h3>
        <p className="text-gray-400">
          ({currentPlayer}/{maxPlayer})
        </p>
      </div>
      <p className="text-2xl font-bold">{isPlaying ? '게임 중' : '게임 대기'}</p>
    </div>
  );
};
