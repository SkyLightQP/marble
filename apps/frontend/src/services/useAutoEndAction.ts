import { useEffect } from 'react';
import { useTimer } from '@/hooks/useTimer';

export const useAutoEndAction = (
  initialTime: number,
  isOpenModal: boolean,
  closeModal: () => void,
  onEnd: () => void
) => {
  const { time, start, stop } = useTimer(initialTime);

  useEffect(() => {
    if (isOpenModal) start();
  }, [isOpenModal, start]);

  useEffect(() => {
    if (time === 0) {
      closeModal();
      onEnd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  const onOverrideClose = () => {
    stop();
    onEnd();
  };

  return { time, onOverrideClose };
};
