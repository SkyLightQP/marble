const TEXT = [
  '빨리 시작하자!',
  '승리의 시작, 함께 뛰어보자!',
  '빠른 출발, 이길 준비 완료!',
  '강자의 길, 여기서 시작해요!',
  '승부의 리그, 경쟁의 무대',
  '경제탐험대, 부의 발견',
  '도시 재건의 시작',
  '부의 흐름, 경제 건축가들의 서막',
  '경제 전쟁, 파산과 부의 교차로',
  '금전 거래의 명가, 도시의 부상'
];

export const useRandomRoomName = (): string => {
  return TEXT[Math.floor(Math.random() * TEXT.length)];
};
