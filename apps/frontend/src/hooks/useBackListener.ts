import { useEffect } from 'react';
import { history } from '@/utils/History';

export const useBackListener = (callback: () => void) => {
  useEffect(() => {
    const unlisten = history.listen(({ action }) => {
      if (action === 'POP') {
        callback();
      }
    });

    return unlisten;
  }, [callback]);
};
