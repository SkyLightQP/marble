import { RiAddFill, RiRefreshLine } from 'react-icons/ri';
import React, { useEffect } from 'react';
import { RootLayout } from '../layouts/RootLayout';
import { Button } from '../components/Button';
import { RoomPreviewCard } from '../components/Room/RoomPreviewCard';
import { useSocket } from '../hooks/useSocket';
import { useSocketListener } from '../hooks/useSocketListener';
import { GetRoomsResponse } from '../types/SocketResponse';

export const RoomListPage: React.FC = () => {
  const [rooms, setRooms] = React.useState<GetRoomsResponse>([]);
  const socket = useSocket();

  useEffect(() => {
    if (socket === undefined) return;
    socket.emit('get-rooms');
  }, [socket]);

  useSocketListener<GetRoomsResponse>('get-rooms', (data) => {
    setRooms(data);
  });

  const onCreateRoomClick = () => {
    if (socket === undefined) return;
    // TODO: implement create room logic and modal.
    socket.emit('create-room', {
      name: `${Math.floor(Math.random() * 1000)} 방`,
      maxPlayer: 4
    });
    socket.emit('get-rooms');
  };

  return (
    <RootLayout className="h-screen w-screen p-20">
      <div className="mb-5 flex items-center">
        <h1 className="mr-4 text-4xl font-bold">
          방 목록<span className="ml-1 text-sm font-normal text-gray-400">({rooms.length})</span>
        </h1>
        <Button className="mr-2 flex h-8 w-8 items-center justify-center text-2xl" onClick={onCreateRoomClick}>
          <RiAddFill />
        </Button>
        <Button className="flex h-8 w-8 items-center justify-center text-xl">
          <RiRefreshLine />
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {rooms.map((room) => (
          <RoomPreviewCard
            key={room.id}
            name={room.name}
            currentPlayer={room.players.length}
            maxPlayer={room.maxPlayer}
            isPlaying={room.isPlaying}
          />
        ))}
      </div>
    </RootLayout>
  );
};
