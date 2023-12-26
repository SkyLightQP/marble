import React from 'react';
import { GameBoard } from '../components/GameBoard';
import { RootLayout } from '../layouts/RootLayout';

export const MainPage: React.FC = () => {
  return (
    <RootLayout className="h-screen w-screen">
      <GameBoard />
    </RootLayout>
  );
};
