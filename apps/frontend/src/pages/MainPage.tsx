import React from 'react';
import { GameBoard } from '../components/GameBoard';
import { RootLayout } from '../layouts/RootLayout';

export const MainPage: React.FC = () => {
  return (
    <RootLayout className="w-screen h-screen">
      <GameBoard />
    </RootLayout>
  );
};
