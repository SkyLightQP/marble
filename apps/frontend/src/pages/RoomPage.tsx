import api from '@marble/backend/dist/src/api';
import React, { useEffect, useState } from 'react';
import { RiCheckFill, RiDoorOpenLine, RiGamepadFill, RiSettings2Fill } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import { apiConnection } from '@/api';
import { GetRoomResponse } from '@/api/SocketResponse';
import { Button } from '@/components/Button';
import { useSocket } from '@/hooks/useSocket';
import { useSocketListener } from '@/hooks/useSocketListener';
import { RootLayout } from '@/layouts/RootLayout';

export const RoomPage: React.FC = () => {
  const [room, setRoom] = useState<GetRoomResponse>();
  const [nicknames, setNicknames] = useState<{ nickname: string; isOwner: boolean }[]>([]);
  const socket = useSocket();
  const { roomId } = useParams();

  useEffect(() => {
    if (socket === undefined) return;
    socket.emit('get-room', { roomId });
  }, [socket, roomId]);

  useSocketListener<GetRoomResponse>('get-room', (data) => {
    setRoom(data);
    setNicknames([]);

    const temp: { nickname: string; isOwner: boolean }[] = [];
    const getNicknames = data.players.map(async (uid) => {
      const user = await api.functional.user.getUserByUid(apiConnection, uid);
      temp.push({ nickname: user.nickname, isOwner: data.owner === uid });
    });
    Promise.all(getNicknames).then(() => setNicknames(temp));
  });

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
        {nicknames.map(({ nickname, isOwner }) => (
          <h3 key={nickname} className="text-2xl font-bold">
            {nickname}
            {isOwner && <span className="ml-1 font-normal text-gray-400">(방장)</span>}
          </h3>
        ))}
      </div>
    </RootLayout>
  );
};
