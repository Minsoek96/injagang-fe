import { useCallback } from 'react';

import { v4 as uuid4 } from 'uuid';

import useToastStore from '@/src/shared/store/useToastStore';

import { toastType } from '@/src/shared/types';

const useToast = (duration: number = 2000) => {
  const { showToastAction, hideToastAction, toastList } = useToastStore();

  const showToast = useCallback(
    (mode: toastType.TOAST_MODE = 'Info', message: string = '') => {
      const id = uuid4();
      const startTime = Date.now();
      const newToastList = {
        id,
        mode,
        message,
        duration,
        startTime,
      };
      showToastAction(newToastList);
      hideToast(id);
    },
    [],
  );

  const hideToast = useCallback((id: string) => {
    const timeoutId = setTimeout(() => {
      hideToastAction(id);
    }, duration);
    return () => clearTimeout(timeoutId);
  }, []);

  return { showToast, toastList };
};
export default useToast;
