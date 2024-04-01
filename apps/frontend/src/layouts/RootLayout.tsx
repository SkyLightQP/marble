import { FC, PropsWithChildren } from 'react';
import { useWindowSize } from '@/hooks/useWindowSize';
import { cn } from '@/utils/cn';

export const RootLayout: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  const [width] = useWindowSize();

  if (width >= 1024) {
    return <div className={cn('bg-gray-50', className)}>{children}</div>;
  }

  return (
    <div className={cn('bg-gray-50 h-screen w-screen flex flex-col justify-center items-center')}>
      <div className="flex flex-col items-center text-center p-4">
        <p className="text-4xl">🎲</p>
        <p className="font-bold text-xl mt-2 break-keep">
          마블을 플레이 하기에 적합한 환경이 아닙니다.
          <br />
          데스크톱(태블릿) 환경에서 이용해 주세요.
        </p>
      </div>
    </div>
  );
};
