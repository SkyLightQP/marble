import React from 'react';
import { RiTrophyLine } from 'react-icons/ri';
import { RankPlayerItem } from '@/components/Rank/RankPlayerItem';

export const RankView: React.FC = () => {
  return (
    <div className="h-60 w-60 rounded-xl border-2 border-gray-300 bg-white p-4 ">
      <h1 className="mb-2 flex items-center text-xl font-bold">
        <RiTrophyLine className="mr-1" />
        순위
      </h1>
      <div className="space-y-1">
        <RankPlayerItem rank={1} name="홍길동" playerColor="red" currentPrice={3000} />
        <RankPlayerItem rank={2} name="김길동" playerColor="blue" currentPrice={2000} isMe />
        <RankPlayerItem rank={3} name="이길동" playerColor="yellow" currentPrice={1500} />
        <RankPlayerItem rank={4} name="박길동" playerColor="green" currentPrice={1000} />
      </div>
    </div>
  );
};
