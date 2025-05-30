import { useCallback, useEffect, useState } from 'react';

export const useTimer = (initialTime: number) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    if (isRunning) {
      timerId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            setIsRunning(false);
            return prevTime;
          }

          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [isRunning]);

  const start = useCallback(() => {
    setTime(initialTime);
    setIsRunning(true);
  }, [initialTime]);

  const stop = useCallback(() => setIsRunning(false), []);

  return { time, start, stop };
};
