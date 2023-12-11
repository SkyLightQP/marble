import React from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { RootLayout } from '../layouts/RootLayout';

export const LoginPage: React.FC = () => {
  return (
    <RootLayout className="w-screen h-screen">
      <div className="h-full flex flex-col justify-center items-center text-center">
        <div className="mb-5">
          <h1 className="text-4xl font-bold">Marble</h1>
          <h2 className="text-lg">로그인하기</h2>
        </div>

        <div className="mb-3">
          <p className="text-left text-sm text-gray-400 ml-1">아이디</p>
          <Input type="text" placeholder="아이디" />
        </div>

        <div className="mb-5">
          <p className="text-left text-sm text-gray-400 ml-1">비밀번호</p>
          <Input type="password" placeholder="비밀번호" autoComplete="off" />
        </div>

        <div>
          <Button className="w-56 h-10">로그인</Button>
        </div>
      </div>
    </RootLayout>
  );
};
