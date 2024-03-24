import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { GetRoomResponse, UpdateRoomResponse, WebSocketError } from '@/api/SocketResponse';
import { RoomMenu } from '@/components/Room/RoomMenu';
import { UpdateRoomForm, updateRoomFormSchema, UpdateRoomModal } from '@/components/Room/UpdateRoomModal';
import { Constants } from '@/constants';
import { useSocket } from '@/hooks/useSocket';
import { useSocketListener } from '@/hooks/useSocketListener';
import { useUser } from '@/hooks/useUser';
import { RootLayout } from '@/layouts/RootLayout';
import { useQuitListener } from '@/services/useQuitListener';
import { lobbySound } from '@/sound';
import { useModalStore } from '@/stores/useModalStore';

export const RoomPage: React.FC = () => {
  const [room, setRoom] = useState<GetRoomResponse>();
  const socket = useSocket();
  const user = useUser();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, reset } = useForm<UpdateRoomForm>({
    defaultValues: {
      name: '',
      maxPeople: 2
    },
    resolver: yupResolver(updateRoomFormSchema)
  });
  const { openModal, closeModal } = useModalStore();

  useEffect(() => {
    const isEnterUsingURL = location.key === 'default';
    if (isEnterUsingURL) {
      socket?.emit('join-room', { roomId });
    }
    socket?.emit('get-room', { roomId });
    lobbySound.play();

    return () => {
      lobbySound.stop();
    };
  }, [socket, roomId, location]);

  useQuitListener({ quitSocket: 'quit-room', roomId: roomId ?? 'loading' });
  useSocketListener<GetRoomResponse>('join-room', setRoom);
  useSocketListener<UpdateRoomResponse>('update-room', setRoom);
  useSocketListener<GetRoomResponse>('get-room', setRoom);
  useSocketListener('start-game', () => {
    navigate(`/game/${roomId}`);
  });
  useSocketListener<WebSocketError>('exception', (error) => {
    toast.error(error.message);
    const needToQuit = [
      'ROOM_NOT_FOUND',
      'PLAYER_NOT_FOUND',
      'PLAYER_ALREADY_EXISTS',
      'ROOM_IS_FULL',
      'ROOM_IS_PLAYING',
      'PERMISSION_DENIED'
    ];
    if (needToQuit.includes(error.code)) navigate(Constants.INGAME_MAIN_PAGE);
  });

  const onUpdateRoomClick: SubmitHandler<UpdateRoomForm> = async (data) => {
    socket?.emit('update-room', { roomId, name: data.name, maxPlayer: Number(data.maxPeople) });
    closeModal(UpdateRoomModal);
  };

  const startGame = () => {
    socket?.emit('start-game', { roomId });
  };

  const updateRoom = () => {
    if (room === undefined) return;
    openModal(UpdateRoomModal, {
      onUpdateRoomClick,
      initialValues: {
        name: room.name,
        maxPeople: room.maxPlayer
      },
      form: { register, handleSubmit, reset }
    });
  };

  const quitRoom = () => {
    socket?.emit('quit-room', { roomId });
    navigate(Constants.INGAME_MAIN_PAGE);
  };

  return (
    <RootLayout className="h-screen w-screen p-20">
      <div className="mb-2">
        <h1 className="mr-4 text-4xl font-bold">
          {room?.name} ({room?.players.length}/{room?.maxPlayer})
        </h1>
      </div>
      <RoomMenu
        onStartClick={startGame}
        onQuitClick={quitRoom}
        onSettingClick={updateRoom}
        isOwner={user === room?.owner}
      />

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
