import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PermissionRoute } from '@/components/PermissionRoute';
import { GamePage } from '@/pages/GamePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { RoomListPage } from '@/pages/RoomListPage';
import { RoomPage } from '@/pages/RoomPage';

export const Router: React.FC = () => {
  const NavigateToLogin = () => <Navigate to="/login" />;

  return (
    <BrowserRouter basename={import.meta.env.BASEPATH ?? '/'}>
      <Routes>
        <Route path="/" element={<Navigate to="/rooms" />} />
        <Route path="/game" element={<Navigate to="/rooms" />} />
        <Route
          path="/game/:roomId"
          element={<PermissionRoute success={<GamePage />} failure={<NavigateToLogin />} />}
        />
        <Route path="/room" element={<Navigate to="/rooms" />} />
        <Route
          path="/room/:roomId"
          element={<PermissionRoute success={<RoomPage />} failure={<NavigateToLogin />} />}
        />
        <Route path="/rooms" element={<PermissionRoute success={<RoomListPage />} failure={<NavigateToLogin />} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};
