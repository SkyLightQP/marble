import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { GetRoomResponse, WebSocketError } from '@/api/SocketResponse';
import { RoomMenu } from '@/components/Room/RoomMenu';
import { getErrorMessage } from '@/error/ErrorMessage';
import { useSocket } from '@/hooks/useSocket';
import { useSocketListener } from '@/hooks/useSocketListener';
import { RootLayout } from '@/layouts/RootLayout';

export const RoomPage: React.FC = () => {
  const [room, setRoom] = useState<GetRoomResponse>();
  const socket = useSocket();
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const beforeUnloadListener = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    socket?.emit('join-room', { roomId });
    window.addEventListener('beforeunload', beforeUnloadListener);

    return () => {
      socket?.emit('quit-room', { roomId });
      window.removeEventListener('beforeunload', beforeUnloadListener);
    };
  }, [socket, roomId]);

  useSocketListener<GetRoomResponse>('join-room', setRoom);
  useSocketListener<WebSocketError>('exception', (error) => {
    toast.error(getErrorMessage(error.code));
    navigate(-1);
  });

  const startGame = () => {
    socket?.emit('start-game', { roomId });
    navigate(`/game/${roomId}`);
  };

  const quitRoom = () => {
    navigate(-1);
  };

  return (
    <RootLayout className="h-screen w-screen p-20">
      <div className="mb-2">
        <h1 className="mr-4 text-4xl font-bold">
          {room?.name} ({room?.players.length}/{room?.maxPlayer})
        </h1>
      </div>
      <RoomMenu onStartClick={startGame} onQuitClick={quitRoom} />

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
