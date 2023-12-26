import { RiAddFill, RiRefreshLine } from 'react-icons/ri';
import { RootLayout } from '../layouts/RootLayout';
import { Button } from '../components/Button';

export const RoomListPage: React.FC = () => {
  return (
    <RootLayout className="w-screen h-screen p-20">
      <div className="flex items-center">
        <h1 className="font-bold text-4xl mr-4">방 목록</h1>
        <Button className="w-8 h-8 text-2xl flex justify-center items-center mr-2">
          <RiAddFill />
        </Button>
        <Button className="w-8 h-8 text-xl flex justify-center items-center">
          <RiRefreshLine />
        </Button>
      </div>
    </RootLayout>
  );
};
