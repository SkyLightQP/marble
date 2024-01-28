import { useEffect } from 'react';
import { useBackListener } from '@/hooks/useBackListener';
import { useSocket } from '@/hooks/useSocket';

export const useQuitListener = (args: {
  readonly roomId: string;
  readonly quitSocket: 'quit-room' | 'dropout-game';
}) => {
  const socket = useSocket();

  useEffect(() => {
    const beforeUnloadListener = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    const unloadListener = () => {
      socket?.emit(args.quitSocket, { roomId: args.roomId });
    };

    window.addEventListener('beforeunload', beforeUnloadListener);
    window.addEventListener('unload', unloadListener);

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadListener);
      window.removeEventListener('unload', unloadListener);
    };
  }, [socket, args.roomId, args.quitSocket]);

  useBackListener(() => {
    socket?.emit(args.quitSocket, { roomId: args.roomId });
  });
};
