import api from '@marble/api';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { InputError } from '../components/InputError';
import { Label } from '../components/Label';
import { API_HOST } from '../constants/api';
import { getErrorMessage } from '../constants/error-message';
import { RootLayout } from '../layouts/RootLayout';
import { getCustomError } from '../utils/error-util';

interface LoginForm {
  readonly id: string;
  readonly password: string;
}

export const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>();

  const onLoginButtonClick: SubmitHandler<LoginForm> = async (data) => {
    try {
      const result = await api.functional.auth.signin({ host: API_HOST }, { id: data.id, password: data.password });
      localStorage.setItem('accessToken', result.accessToken);
      window.location.reload();
    } catch (e) {
      const error = getCustomError(e);
      toast.error(getErrorMessage(error.code));
    }
  };

  return (
    <RootLayout className="w-screen h-screen">
      <div className="h-full flex flex-col justify-center items-center text-center">
        <div className="mb-5">
          <h1 className="text-4xl font-Lotteriachab">Marble</h1>
          <h2 className="text-lg">로그인하기</h2>
        </div>

        <div className="mb-3">
          <Label htmlFor="loginPage-id">아이디</Label>
          <Input id="loginPage-id" type="text" placeholder="아이디" {...register('id', { required: true })} />
          <InputError formError={errors.id} type="required">
            아이디 칸이 비어있습니다.
          </InputError>
        </div>

        <div className="mb-5">
          <Label htmlFor="loginPage-password">비밀번호</Label>
          <Input
            id="loginPage-password"
            type="password"
            placeholder="비밀번호"
            autoComplete="off"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(onLoginButtonClick)()}
            {...register('password', { required: true })}
          />
          <InputError formError={errors.id} type="required">
            비밀번호 칸이 비어있습니다.
          </InputError>
        </div>

        <div>
          <Button className="w-56 h-10" onClick={handleSubmit(onLoginButtonClick)}>
            로그인
          </Button>
        </div>
      </div>
    </RootLayout>
  );
};
