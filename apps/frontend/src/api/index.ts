import { IConnection } from '@marble/api';

export const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:8080';

export const apiConnection: IConnection = {
  host: API_HOST,
  options: {
    credentials: 'include'
  },
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }
};
