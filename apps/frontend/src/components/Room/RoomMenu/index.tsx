import clsx from 'clsx';
import { FC } from 'react';
import { RiCheckFill, RiDoorOpenLine, RiGamepadFill, RiSettings2Fill } from 'react-icons/ri';
import { Button } from '@/components/Button';

interface RoomMenuProps {
  readonly onStartClick?: () => void;
  readonly onReadyClick?: () => void;
  readonly onSettingClick?: () => void;
  readonly onQuitClick?: () => void;
}

const disableButton = 'bg-gray-500 cursor-no-drop hover:bg-gray-600';

export const RoomMenu: FC<RoomMenuProps> = ({ onStartClick, onReadyClick, onSettingClick, onQuitClick }) => {
  return (
    <div className="mb-8 flex items-center space-x-2">
      <Button className="flex h-8 w-28 items-center justify-center text-2xl" onClick={onStartClick}>
        <RiGamepadFill />
        <span className="ml-1 text-base">게임 시작</span>
      </Button>
      <Button
        className={clsx('flex h-8 w-28 items-center justify-center text-2xl', disableButton)}
        onClick={onReadyClick}
      >
        <RiCheckFill />
        <span className="ml-1 text-base">게임 준비</span>
      </Button>
      <Button
        className={clsx('flex h-8 w-28 items-center justify-center text-xl', disableButton)}
        onClick={onSettingClick}
      >
        <RiSettings2Fill />
        <span className="ml-1 text-base">방 설정</span>
      </Button>
      <Button
        className="flex h-8 w-28 items-center justify-center bg-red-500 text-2xl hover:bg-red-600"
        onClick={onQuitClick}
      >
        <RiDoorOpenLine />
        <span className="ml-1 text-base">방 나가기</span>
      </Button>
    </div>
  );
};