import { yupResolver } from '@hookform/resolvers/yup';
import api from '@marble/api';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { apiConnection } from '@/api';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { InputError } from '@/components/InputError';
import { Label } from '@/components/Label';
import { Logo } from '@/components/Logo';
import { getCustomError } from '@/error/ErrorUtil';
import { RootLayout } from '@/layouts/RootLayout';

interface LoginForm {
  readonly id: string;
  readonly password: string;
}

const loginFormSchema = yup.object().shape({
  id: yup.string().required(),
  password: yup.string().required()
});

export const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({ resolver: yupResolver(loginFormSchema) });
  const navigate = useNavigate();

  const onLoginButtonClick: SubmitHandler<LoginForm> = async (data) => {
    try {
      const result = await api.functional.auth.signin(apiConnection, { id: data.id, password: data.password });
      localStorage.setItem('accessToken', result.accessToken);
      navigate('/rooms');
      window.location.reload();
    } catch (e) {
      const error = getCustomError(e);
      toast.error(error.message);
    }
  };

  return (
    <RootLayout className="h-screen w-screen">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="mb-5">
          <Logo />
          <h2 className="text-lg">로그인하기</h2>
        </div>

        <div className="mb-3">
          <Label htmlFor="loginPage-id">아이디</Label>
          <Input id="loginPage-id" type="text" placeholder="아이디" {...register('id')} />
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
            {...register('password')}
          />
          <InputError formError={errors.id} type="required">
            비밀번호 칸이 비어있습니다.
          </InputError>
        </div>

        <div className="space-y-2">
          <Button className="h-10 w-56" onClick={handleSubmit(onLoginButtonClick)}>
            로그인
          </Button>
          <Button className="h-10 w-56" onClick={() => navigate('/register')}>
            회원가입
          </Button>
        </div>
      </div>
    </RootLayout>
  );
};
