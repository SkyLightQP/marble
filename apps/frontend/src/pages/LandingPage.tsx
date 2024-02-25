import { FC } from 'react';
import { RiGamepadFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import Image from '@/images/thumb.png';

export const LandingPage: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mb-20 pt-20 px-40 flex justify-between items-center">
        <div>
          <Logo className="text-4xl" />
          <p className="text-2xl font-bold">웹에서 주사위 보드게임을 플레이 해보세요!</p>
        </div>
        <div>
          <Button
            className="w-60 h-16 text-xl font-bold flex justify-center items-center bg-cyan-500 hover:bg-cyan-600"
            onClick={() => navigate('/rooms')}
          >
            <RiGamepadFill className="mr-2" /> 게임 시작
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <img src={Image} width={960} alt="게임화면 미리보기" className="border-2" />
      </div>
    </>
  );
};
