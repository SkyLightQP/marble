import api from '@marble/api';
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { API_HOST } from '../api';

type UUID = string;

const context = createContext<UUID | undefined>(undefined);
const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UUID | undefined>(undefined);

  const fetchUser = async () => {
    try {
      const result = await api.functional.auth.me({
        host: API_HOST,
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      setUser(result.userId);
    } catch (e) {
      setUser(undefined);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser, accessToken]);

  return <context.Provider value={user}>{children}</context.Provider>;
};

export const useUser = () => useContext(context);
