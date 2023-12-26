import { RiAddFill, RiRefreshLine } from 'react-icons/ri';
import { RootLayout } from '../layouts/RootLayout';
import { Button } from '../components/Button';
import { RoomPreviewCard } from '../components/Room/RoomPreviewCard';

export const RoomListPage: React.FC = () => {
  return (
    <RootLayout className="w-screen h-screen p-20">
      <div className="flex items-center mb-5">
        <h1 className="font-bold text-4xl mr-4">
          방 목록<span className="font-normal text-gray-400 text-sm ml-1">(6)</span>
        </h1>
        <Button className="w-8 h-8 text-2xl flex justify-center items-center mr-2">
          <RiAddFill />
        </Button>
        <Button className="w-8 h-8 text-xl flex justify-center items-center">
          <RiRefreshLine />
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <RoomPreviewCard name="방제목입니다" currentPlayer={2} maxPlayer={4} isPlaying />
        <RoomPreviewCard name="게임 플레이 중입니다" currentPlayer={2} maxPlayer={4} isPlaying />
        <RoomPreviewCard name="매우매우매우매우매우긴긴긴제제제목목목" currentPlayer={2} maxPlayer={4} />
        <RoomPreviewCard name="머시기" currentPlayer={2} maxPlayer={4} />
        <RoomPreviewCard name="머시기" currentPlayer={2} maxPlayer={4} />
        <RoomPreviewCard name="머시기" currentPlayer={2} maxPlayer={4} />
      </div>
    </RootLayout>
  );
};
