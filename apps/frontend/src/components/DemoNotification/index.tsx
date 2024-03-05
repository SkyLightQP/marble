import { FC } from 'react';
import { RiPushpin2Fill } from 'react-icons/ri';

export const DemoNotification: FC = () => {
  return (
    <div className="absolute right-0 top-0 w-[30rem] h-auto bg-white shadow-md rounded-lg p-4 mt-2 mr-3">
      <h3 className="flex items-center text-xl font-bold">
        <RiPushpin2Fill className="mr-1" /> 마블 프로젝트 데모 페이지
      </h3>
      <p className="mt-2">
        해당 사이트는 마블 프로젝트 데모입니다.
        <br />
        별도의 공지 없이 계정이 삭제되거나 정보가 초기화될 수 있습니다.
        <br />
        회원가입 시 아래 정보를 수집하며 수집에 동의한 것으로 간주합니다.
        <br />- 수집 정보: 아이디, 암호화된 비밀번호, 닉네임, 게임 이용 로그
      </p>
    </div>
  );
};
