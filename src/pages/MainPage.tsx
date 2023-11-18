import React from 'react';
import { GameBoard } from '../components/GameBoard';

export const MainPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <GameBoard />
    </div>
  );
};
