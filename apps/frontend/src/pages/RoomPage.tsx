import React, { useEffect, useState } from 'react';
import { RiCheckFill, RiDoorOpenLine, RiGamepadFill, RiSettings2Fill } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import { GetRoomResponse } from '@/api/SocketResponse';
import { Button } from '@/components/Button';
import { useSocket } from '@/hooks/useSocket';
import { useSocketListener } from '@/hooks/useSocketListener';
import { RootLayout } from '@/layouts/RootLayout';

export const RoomPage: React.FC = () => {
  const [room, setRoom] = useState<GetRoomResponse>();
  const socket = useSocket();
  const { roomId } = useParams();

  useEffect(() => {
    socket?.emit('join-room', { roomId });

    return () => {
      socket?.emit('quit-room', { roomId });
    };
  }, [socket, roomId]);

  useSocketListener<GetRoomResponse>('join-room', setRoom);

  return (
    <RootLayout className="h-screen w-screen p-20">
      <div className="mb-2">
        <h1 className="mr-4 text-4xl font-bold">
          {room?.name} ({room?.players.length}/{room?.maxPlayer})
        </h1>
      </div>
      <div className="mb-8 flex items-center space-x-2">
        <Button className="flex h-8 w-28 items-center justify-center text-2xl">
          <RiGamepadFill />
          <span className="ml-1 text-base">게임 시작</span>
        </Button>
        <Button className="flex h-8 w-28 items-center justify-center text-2xl">
          <RiCheckFill />
          <span className="ml-1 text-base">게임 준비</span>
        </Button>
        <Button className="flex h-8 w-28 items-center justify-center text-xl">
          <RiSettings2Fill />
          <span className="ml-1 text-base">방 설정</span>
        </Button>
        <Button className="flex h-8 w-28 items-center justify-center bg-red-500 text-2xl hover:bg-red-600">
          <RiDoorOpenLine />
          <span className="ml-1 text-base">방 나가기</span>
        </Button>
      </div>

      <div>
        {room?.players.map(({ userId, nickname }) => (
          <h3 key={nickname} className="text-2xl font-bold">
            {nickname}
            {room.owner === userId && <span className="ml-1 font-normal text-gray-400">(방장)</span>}
          </h3>
        ))}
      </div>
    </RootLayout>
  );
};
