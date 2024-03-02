import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PermissionRoute } from '@/components/PermissionRoute';
import { GamePage } from '@/pages/GamePage';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { RoomListPage } from '@/pages/RoomListPage';
import { RoomPage } from '@/pages/RoomPage';

export const Router: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASEPATH ?? '/'}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<Navigate to="/rooms" />} />
        <Route
          path="/game/:roomId"
          element={<PermissionRoute success={<GamePage />} failure={<Navigate to="/login" />} />}
        />
        <Route path="/room" element={<Navigate to="/rooms" />} />
        <Route
          path="/room/:roomId"
          element={<PermissionRoute success={<RoomPage />} failure={<Navigate to="/login" />} />}
        />
        <Route
          path="/rooms"
          element={<PermissionRoute success={<RoomListPage />} failure={<Navigate to="/login" />} />}
        />
        <Route path="/login" element={<PermissionRoute success={<Navigate to="/rooms" />} failure={<LoginPage />} />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};
