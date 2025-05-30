import { FC } from 'react';
import { RiCheckFill, RiDoorOpenLine, RiGamepadFill, RiSettings2Fill } from 'react-icons/ri';
import { Button } from '@/components/Button';
import { cn } from '@/utils/cn';

interface RoomMenuProps {
  readonly onStartClick?: () => void;
  readonly onReadyClick?: () => void;
  readonly onSettingClick?: () => void;
  readonly onQuitClick?: () => void;
  readonly isOwner?: boolean;
}

export const RoomMenu: FC<RoomMenuProps> = ({ onStartClick, onReadyClick, onSettingClick, onQuitClick, isOwner }) => {
  return (
    <div className="mb-8 flex items-center space-x-2">
      <Button
        className={cn('flex h-8 w-28 items-center justify-center text-2xl', !isOwner && 'hidden')}
        onClick={onStartClick}
      >
        <RiGamepadFill />
        <span className="ml-1 text-base">게임 시작</span>
      </Button>
      <Button
        className={cn('flex h-8 w-28 items-center justify-center text-2xl', isOwner && 'hidden')}
        onClick={onReadyClick}
      >
        <RiCheckFill />
        <span className="ml-1 text-base">게임 준비</span>
      </Button>
      <Button
        className={cn('flex h-8 w-28 items-center justify-center text-xl', !isOwner && 'hidden')}
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
