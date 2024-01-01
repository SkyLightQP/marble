import React from 'react';
import toast from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WebSocketError } from '@/api/SocketResponse';
import { PermissionRoute } from '@/components/PermissionRoute';
import { getErrorMessage } from '@/error/ErrorMessage';
import { useSocketListener } from '@/hooks/useSocketListener';
import { LoginPage } from '@/pages/LoginPage';
import { MainPage } from '@/pages/MainPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { RoomListPage } from '@/pages/RoomListPage';
import { RoomPage } from '@/pages/RoomPage';

export const Router: React.FC = () => {
  useSocketListener<WebSocketError>('exception', (error) => {
    toast.error(getErrorMessage(error.code));
  });

  return (
    <BrowserRouter basename={process.env.REACT_APP_BASEPATH ?? '/'}>
      <Routes>
        <Route path="/" element={<PermissionRoute success={<MainPage />} failure={<LoginPage />} />} />
        <Route path="/rooms" element={<PermissionRoute success={<RoomListPage />} failure={<LoginPage />} />} />
        <Route path="/room/:roomId" element={<PermissionRoute success={<RoomPage />} failure={<LoginPage />} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};
