import { useEffect } from 'react';
import { useSocket } from './useSocket';

export const useSocketListener = <T = unknown>(event: string, callback: (data: T) => void) => {
  const socket = useSocket();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    if (socket === undefined) return () => {};

    socket.on(event, callback);

    return () => {
      socket.removeListener(event, callback);
    };
  }, [socket, event, callback]);
};
