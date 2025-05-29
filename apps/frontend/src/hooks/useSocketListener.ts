import { useEffect } from 'react';
import { useSocket } from '@/hooks/useSocket';

export const useSocketListener = <T = unknown>(event: string, callback: (data: T) => void) => {
  const socket = useSocket();
  useEffect(() => {
    if (socket === undefined) return () => {};

    socket.on(event, callback);

    return () => {
      socket.removeListener(event, callback);
    };
  }, [socket, event, callback]);
};
