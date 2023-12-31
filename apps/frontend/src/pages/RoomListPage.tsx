import { RiAddFill, RiRefreshLine } from 'react-icons/ri';
import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RootLayout } from '../layouts/RootLayout';
import { Button } from '../components/Button';
import { RoomPreviewCard } from '../components/Room/RoomPreviewCard';
import { useSocket } from '../hooks/useSocket';
import { useSocketListener } from '../hooks/useSocketListener';
import { GetRoomsResponse } from '../api/SocketResponse';
import { CreateRoomForm, CreateRoomModal } from '../components/Room/CreateRoomModal';

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

  const refreshRooms = useCallback(() => {
    if (socket === undefined) return;
    socket.emit('get-rooms');
  }, [socket]);

  useEffect(() => {
    refreshRooms();
  }, [refreshRooms]);

  useSocketListener<GetRoomsResponse>('get-rooms', setRooms);

  const onCreateRoomClick: SubmitHandler<CreateRoomForm> = async (data) => {
    if (socket === undefined) return;
    socket.emit('create-room', {
      name: data.name,
      maxPlayer: Number(data.maxPeople)
    });
    reset({
      name: '',
      maxPeople: 1
    });
    setIsOpen(false);

    // TODO: Join a room.
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
          <Button className="flex h-8 w-8 items-center justify-center text-xl" onClick={refreshRooms}>
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
      <CreateRoomModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onCreateRoomClick={onCreateRoomClick}
        form={{ register, handleSubmit, reset }}
      />
    </>
  );
};
