import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { API_HOST } from '@/api';

const context = createContext<Socket | undefined>(undefined);
const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

export const SocketProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    const client = io(API_HOST, {
      query: {
        token: accessToken
      }
    });
    client.connect();
    setSocket(client);

    return () => {
      client.disconnect();
    };
  }, []);

  return <context.Provider value={socket}>{children}</context.Provider>;
};

export const useSocket = () => useContext(context);
