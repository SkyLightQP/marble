import { FC } from 'react';
import { RiBuildingLine } from 'react-icons/ri';

export const CityInformationView: FC = () => {
  return (
    <div className="h-60 w-60 rounded-xl border-2 border-gray-300 bg-white p-4">
      <h1 className="mb-2 flex items-center text-xl font-bold">
        <RiBuildingLine className="mr-1" />
        보유 중인 도시 및 건물
      </h1>
      <div className="flex space-x-7">
        <ul className="list-disc ml-5 space-y-1">
          <li className="w-[45px] cursor-pointer hover:text-blue-500 hover:underline">서울</li>
          <li className="w-[45px] cursor-pointer hover:text-blue-500 hover:underline">남양주</li>
          <li className="w-[45px] cursor-pointer hover:text-blue-500 hover:underline">제주도</li>
        </ul>
        <ul className="list-disc ml-5 space-y-1" />
        <ul className="list-disc ml-5 space-y-1" />
      </div>
    </div>
  );
};
