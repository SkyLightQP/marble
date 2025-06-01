import { FC } from 'react';

export const DemoNotification: FC = () => {
  return (
    <div className="absolute right-0 top-0 w-[30rem] h-auto bg-white shadow-md rounded-lg p-4 mt-4 mr-4">
      <h3 className="flex items-center text-xl font-bold">회원가입 전에...</h3>
      <p className="mt-2 space-y-1.5">
        <div>
          회원가입 시 아래 정보 수집에 동의한 것으로 간주합니다.
          <br />- 수집 정보: 아이디, 암호화된 비밀번호, 닉네임, 게임 이용 로그
        </div>
        <div>
          개인정보 삭제(탈퇴)가 필요할 경우 아래 이메일로 요청해주세요.
          <br />- 이메일: combbm [at] gmail [dot] com
        </div>
      </p>
    </div>
  );
};
