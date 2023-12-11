import React from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { RootLayout } from '../layouts/RootLayout';

export const LoginPage: React.FC = () => {
  return (
    <RootLayout className="w-screen h-screen">
      <div className="h-full flex flex-col justify-center items-center text-center">
        <div className="mb-5">
          <h1 className="text-4xl font-Lotteriachab">Marble</h1>
          <h2 className="text-lg">로그인하기</h2>
        </div>

        <div className="mb-3">
          <Label htmlFor="loginPage-id">아이디</Label>
          <Input id="loginPage-id" type="text" placeholder="아이디" />
        </div>

        <div className="mb-5">
          <Label htmlFor="loginPage-password">비밀번호</Label>
          <Input id="loginPage-password" type="password" placeholder="비밀번호" autoComplete="off" />
        </div>

        <div>
          <Button className="w-56 h-10">로그인</Button>
        </div>
      </div>
    </RootLayout>
  );
};
