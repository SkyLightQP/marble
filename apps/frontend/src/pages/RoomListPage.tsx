import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RiAddFill, RiRefreshLine, RiSettings2Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { CreateRoomResponse, GetRoomsResponse, WebSocketError } from '@/api/SocketResponse';
import { Button } from '@/components/Button';
import { GameSettingModal } from '@/components/GameSettingModal';
import { Logo } from '@/components/Logo';
import { CreateRoomForm, createRoomFormSchema, CreateRoomModal } from '@/components/Room/CreateRoomModal';
import { RoomPreviewCard } from '@/components/Room/RoomPreviewCard';
import { useRandomRoomName } from '@/hooks/useRandomRoomName';
import { useSocket } from '@/hooks/useSocket';
import { useSocketListener } from '@/hooks/useSocketListener';
import { RootLayout } from '@/layouts/RootLayout';
import { useRefreshToken } from '@/services/useRefreshToken';
import { lobbySound } from '@/sound';
import { useModalStore } from '@/stores/useModalStore';

export const RoomListPage: React.FC = () => {
  const roomName = useRandomRoomName();
  const [rooms, setRooms] = useState<GetRoomsResponse>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateRoomForm>({
    defaultValues: {
      name: roomName,
      maxPeople: 2
    },
    resolver: yupResolver(createRoomFormSchema)
  });
  const navigate = useNavigate();
  const socket = useSocket();
  const { openModal, closeModal } = useModalStore();

  useRefreshToken();

  useEffect(() => {
    socket?.emit('get-rooms');
    socket?.emit('util:join-lobby');

    lobbySound.play();

    const refreshRoom = setInterval(() => {
      socket?.emit('get-rooms');
    }, 1000 * 5);

    return () => {
      socket?.emit('util:quit-lobby');
      clearInterval(refreshRoom);
      lobbySound.stop();
    };
  }, [socket]);

  useSocketListener<GetRoomsResponse>('get-rooms', setRooms);
  useSocketListener('quit-room', () => socket?.emit('get-rooms'));
  useSocketListener<CreateRoomResponse>('create-room', ({ id }) => {
    navigate(`/room/${id}`);
    socket?.emit('join-room', { roomId: id });
  });
  useSocketListener<WebSocketError>('exception', (error) => {
    if (error.code === 'PLAYER_NOT_FOUND') return;
    toast.error(error.message);
  });

  const onCreateRoomClick: SubmitHandler<CreateRoomForm> = async (data) => {
    socket?.emit('create-room', {
      name: data.name,
      maxPlayer: Number(data.maxPeople)
    });
    reset({
      name: '',
      maxPeople: 2
    });
    closeModal(CreateRoomModal);
  };

  const onSettingClick = () => {
    openModal(GameSettingModal, {});
  };

  return (
    <RootLayout className="h-screen w-screen p-20">
      <Logo className="-ml-1 mb-3" />
      <div className="mb-5 flex items-center">
        <h1 className="mr-4 text-4xl font-bold">
          방 목록<span className="ml-1 text-sm font-normal text-gray-400">({rooms.length})</span>
        </h1>
        <div className="flex space-x-2">
          <Button
            className="flex h-8 w-8 items-center justify-center text-2xl"
            onClick={() => {
              openModal(CreateRoomModal, {
                onCreateRoomClick,
                form: { register, handleSubmit, reset, errors }
              });
            }}
          >
            <RiAddFill />
          </Button>
          <Button
            className="flex h-8 w-8 items-center justify-center text-xl"
            onClick={() => socket?.emit('get-rooms')}
          >
            <RiRefreshLine />
          </Button>
          <Button className="flex h-8 w-8 items-center justify-center text-xl" onClick={onSettingClick}>
            <RiSettings2Fill />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4">
        {rooms.map((room) => (
          <RoomPreviewCard
            key={room.id}
            name={room.name}
            currentPlayer={room.players.length}
            maxPlayer={room.maxPlayer}
            isPlaying={room.isPlaying}
            onClick={() => {
              navigate(`/room/${room.id}`);
              socket?.emit('join-room', { roomId: room.id });
            }}
          />
        ))}
      </div>
    </RootLayout>
  );
};
