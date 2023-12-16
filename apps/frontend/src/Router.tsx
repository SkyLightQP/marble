import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PermissionRoute } from './components/PermissionRoute';
import { LoginPage } from './pages/LoginPage';
import { MainPage } from './pages/MainPage';
import { RegisterPage } from './pages/RegisterPage';

export const Router: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASEPATH ?? '/'}>
      <Routes>
        <Route path="/" element={<PermissionRoute success={<MainPage />} failure={<LoginPage />} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};
