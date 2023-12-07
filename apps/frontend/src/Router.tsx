import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';

export const Router: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASEPATH ?? '/'}>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};
