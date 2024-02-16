import api from '@marble/api';
import { useEffect } from 'react';
import { apiConnection } from '@/api';

export const useRefreshToken = () => {
  useEffect(() => {
    api.functional.auth.refresh(apiConnection).then((res) => {
      localStorage.setItem('accessToken', res.accessToken);
    });
  }, []);
};
