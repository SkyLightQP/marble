import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { GetRoomResponse, WebSocketError } from '@/api/SocketResponse';
import { RoomMenu } from '@/components/Room/RoomMenu';
import { useSocket } from '@/hooks/useSocket';
import { useSocketListener } from '@/hooks/useSocketListener';
import { RootLayout } from '@/layouts/RootLayout';
import { useQuitListener } from '@/services/useQuitListener';

export const RoomPage: React.FC = () => {
  const [room, setRoom] = useState<GetRoomResponse>();
  const socket = useSocket();
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    socket?.emit('join-room', { roomId });
  }, [socket, roomId]);

  useQuitListener({ quitSocket: 'quit-room', roomId: roomId ?? 'loading' });
  useSocketListener<GetRoomResponse>('join-room', setRoom);
  useSocketListener<GetRoomResponse>('get-room', setRoom);
  useSocketListener('start-game', () => {
    navigate(`/game/${roomId}`);
  });
  useSocketListener<WebSocketError>('exception', (error) => {
    toast.error(error.message);
    if (error.code === 'IS_NOT_OWNER') return;
    navigate('/');
  });

  const startGame = () => {
    socket?.emit('start-game', { roomId });
  };

  const quitRoom = () => {
    socket?.emit('quit-room', { roomId });
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
