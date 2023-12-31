import api from '@marble/api';
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { apiConnection } from '../api';

type UUID = string;

const context = createContext<UUID | undefined>(undefined);

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UUID | undefined>(undefined);

  const fetchUser = async () => {
    try {
      const result = await api.functional.auth.me(apiConnection);

      setUser(result.userId);
    } catch (e) {
      setUser(undefined);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return <context.Provider value={user}>{children}</context.Provider>;
};

export const useUser = () => useContext(context);
