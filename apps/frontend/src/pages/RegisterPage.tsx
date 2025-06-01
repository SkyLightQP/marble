import { yupResolver } from '@hookform/resolvers/yup';
import api from '@marble/api';
import { ErrorCode } from '@marble/common';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { apiConnection } from '@/api';
import { Button } from '@/components/Button';
import { DemoNotification } from '@/components/DemoNotification';
import { Input } from '@/components/Input';
import { InputError } from '@/components/InputError';
import { Label } from '@/components/Label';
import { Logo } from '@/components/Logo';
import { getCustomError } from '@/error/ErrorUtil';
import { RootLayout } from '@/layouts/RootLayout';

interface RegisterForm {
  readonly id: string;
  readonly password: string;
  readonly passwordConfirm: string;
  readonly nickname: string;
}

const registerFormSchema = yup.object().shape({
  id: yup.string().required(),
  password: yup.string().required().min(6),
  passwordConfirm: yup
    .string()
    .required()
    .min(6)
    .oneOf([yup.ref('password')], 'password_not_match'),
  nickname: yup.string().required()
});

export const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterForm>({ resolver: yupResolver(registerFormSchema) });
  const navigate = useNavigate();

  const onRegisterButtonClick: SubmitHandler<RegisterForm> = async (data) => {
    try {
      await api.functional.auth.signup(apiConnection, {
        id: data.id,
        password: data.password,
        nickname: data.nickname
      });
      toast.success('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (e) {
      const error = getCustomError(e);
      if (error.code === ErrorCode.USER_ALREADY_EXISTS.code) {
        toast.error('아이디 또는 닉네임이 이미 존재합니다.');
        return;
      }
      toast.error(error.message);
    }
  };

  return (
    <RootLayout className="h-screen w-screen">
      <DemoNotification />

      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="mb-8">
          <Logo />
          <h1 className="text-lg mt-1 font-bold">회원가입</h1>
        </div>

        <div className="mb-3">
          <Label htmlFor="registerPage-id">아이디</Label>
          <Input id="registerPage-id" type="text" placeholder="아이디" {...register('id')} />
          <InputError formError={errors.id} type="required">
            아이디 칸이 비어있습니다.
          </InputError>
        </div>

        <div className="mb-3">
          <Label htmlFor="registerPage-password">비밀번호 (6자리 이상)</Label>
          <Input
            id="registerPage-password"
            type="password"
            placeholder="비밀번호"
            autoComplete="off"
            {...register('password')}
          />
          <InputError formError={errors.password} type="required">
            비밀번호 칸이 비어있습니다.
          </InputError>
          <InputError formError={errors.password} type="min">
            비밀번호는 6자 이상이어야 합니다.
          </InputError>
        </div>

        <div className="mb-3">
          <Label htmlFor="loginPage-passwordConfirm">비밀번호 재확인</Label>
          <Input
            id="loginPage-passwordConfirm"
            type="password"
            placeholder="비밀번호 재확인"
            autoComplete="off"
            {...register('passwordConfirm')}
          />
          <InputError formError={errors.passwordConfirm} type="required">
            비밀번호 재확인 칸이 비어있습니다.
          </InputError>
          <InputError formError={errors.passwordConfirm} type="validate" message="password_not_match">
            비밀번호가 일치하지 않습니다.
          </InputError>
        </div>

        <div className="mb-5">
          <Label htmlFor="registerPage-nickname">닉네임</Label>
          <Input
            id="registerPage-nickname"
            type="text"
            placeholder="닉네임"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(onRegisterButtonClick)()}
            {...register('nickname')}
          />
          <InputError formError={errors.nickname} type="required">
            닉네임 칸이 비어있습니다.
          </InputError>
        </div>

        <div className="space-y-2">
          <Button className="h-10 w-56" onClick={handleSubmit(onRegisterButtonClick)}>
            회원가입
          </Button>
          <Button className="h-10 w-56 bg-gray-400 hover:bg-gray-500" onClick={() => navigate(-1)}>
            뒤로가기
          </Button>
        </div>
      </div>
    </RootLayout>
  );
};
