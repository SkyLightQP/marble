import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RiAddFill, RiRefreshLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { CreateRoomResponse, GetRoomsResponse } from '@/api/SocketResponse';
import { Button } from '@/components/Button';
import { CreateRoomForm, CreateRoomModal } from '@/components/Room/CreateRoomModal';
import { RoomPreviewCard } from '@/components/Room/RoomPreviewCard';
import { useSocket } from '@/hooks/useSocket';
import { useSocketListener } from '@/hooks/useSocketListener';
import { RootLayout } from '@/layouts/RootLayout';

export const RoomListPage: React.FC = () => {
  const [rooms, setRooms] = React.useState<GetRoomsResponse>([]);
  const socket = useSocket();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<CreateRoomForm>({
    defaultValues: {
      name: '',
      maxPeople: 1
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    socket?.emit('get-rooms');
    socket?.emit('util:join-lobby');

    return () => {
      socket?.emit('util:leave-lobby');
    };
  }, [socket]);

  useSocketListener<GetRoomsResponse>('get-rooms', setRooms);
  useSocketListener<CreateRoomResponse>('create-room', ({ id }) => {
    navigate(`/room/${id}`);
  });

  const onCreateRoomClick: SubmitHandler<CreateRoomForm> = async (data) => {
    socket?.emit('create-room', {
      name: data.name,
      maxPlayer: Number(data.maxPeople)
    });
    reset({
      name: '',
      maxPeople: 1
    });
    setIsOpen(false);
  };

  return (
    <>
      <RootLayout className="h-screen w-screen p-20">
        <div className="mb-5 flex items-center">
          <h1 className="mr-4 text-4xl font-bold">
            방 목록<span className="ml-1 text-sm font-normal text-gray-400">({rooms.length})</span>
          </h1>
          <Button className="mr-2 flex h-8 w-8 items-center justify-center text-2xl" onClick={() => setIsOpen(true)}>
            <RiAddFill />
          </Button>
          <Button
            className="flex h-8 w-8 items-center justify-center text-xl"
            onClick={() => socket?.emit('get-rooms')}
          >
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
              onClick={() => navigate(`/room/${room.id}`)}
            />
          ))}
        </div>
      </RootLayout>

      <CreateRoomModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onCreateRoomClick={onCreateRoomClick}
        form={{ register, handleSubmit, reset }}
      />
    </>
  );
};
