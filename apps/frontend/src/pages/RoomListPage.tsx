import { RiAddFill, RiRefreshLine } from 'react-icons/ri';
import { RootLayout } from '../layouts/RootLayout';
import { Button } from '../components/Button';
import { RoomPreviewCard } from '../components/Room/RoomPreviewCard';

export const RoomListPage: React.FC = () => {
  return (
    <RootLayout className="h-screen w-screen p-20">
      <div className="mb-5 flex items-center">
        <h1 className="mr-4 text-4xl font-bold">
          방 목록<span className="ml-1 text-sm font-normal text-gray-400">(6)</span>
        </h1>
        <Button className="mr-2 flex h-8 w-8 items-center justify-center text-2xl">
          <RiAddFill />
        </Button>
        <Button className="flex h-8 w-8 items-center justify-center text-xl">
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
