import api from '@marble/api';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { InputError } from '../components/InputError';
import { Label } from '../components/Label';
import { apiConnection } from '../api';
import { getErrorMessage } from '../error/ErrorMessage';
import { RootLayout } from '../layouts/RootLayout';
import { getCustomError } from '../error/ErrorUtil';

interface RegisterForm {
  readonly id: string;
  readonly password: string;
  readonly passwordConfirm: string;
  readonly nickname: string;
}

export const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<RegisterForm>();
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
      toast.error(getErrorMessage(error.code));
    }
  };

  return (
    <RootLayout className="h-screen w-screen">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="mb-5">
          <div className="mb-3">
            <h1 className="font-Lotteriachab text-4xl">Marble</h1>
            <h3 className="text-sm">🎲 웹기반 도시건설 보드게임 🎲</h3>
          </div>
          <h2 className="text-lg">회원가입하기</h2>
        </div>

        <div className="mb-3">
          <Label htmlFor="registerPage-id">아이디</Label>
          <Input id="registerPage-id" type="text" placeholder="아이디" {...register('id', { required: true })} />
          <InputError formError={errors.id} type="required">
            아이디 칸이 비어있습니다.
          </InputError>
        </div>

        <div className="mb-3">
          <Label htmlFor="registerPage-password">비밀번호</Label>
          <Input
            id="registerPage-password"
            type="password"
            placeholder="비밀번호"
            autoComplete="off"
            {...register('password', { required: true })}
          />
          <InputError formError={errors.password} type="required">
            비밀번호 칸이 비어있습니다.
          </InputError>
        </div>

        <div className="mb-3">
          <Label htmlFor="loginPage-passwordConfirm">비밀번호 재확인</Label>
          <Input
            id="loginPage-passwordConfirm"
            type="password"
            placeholder="비밀번호 재확인"
            autoComplete="off"
            {...register('passwordConfirm', {
              required: true,
              validate: (s: string) => {
                if (watch('password') !== s) return 'password_not_match';
                return undefined;
              }
            })}
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
            {...register('nickname', { required: true })}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(onRegisterButtonClick)()}
          />
          <InputError formError={errors.nickname} type="required">
            닉네임 칸이 비어있습니다.
          </InputError>
        </div>

        <div>
          <Button className="h-10 w-56" onClick={handleSubmit(onRegisterButtonClick)}>
            회원가입
          </Button>
        </div>
      </div>
    </RootLayout>
  );
};
