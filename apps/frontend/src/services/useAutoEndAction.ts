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
  }, [time]);

  const onOverrideClose = () => {
    stop();
    onEnd();
  };

  return { time, onOverrideClose };
};
