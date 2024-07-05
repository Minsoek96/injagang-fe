import { useCallback } from 'react';

import { v4 as uuid4 } from 'uuid';

import useToastStore from '@/store/toast/useToastStore';
import { TOAST_MODE } from '@/types/toast/ToastType';

const useToast = (duration: number = 3000) => {
  const { showToastAction, hideToastAction } = useToastStore();

  const showToast = useCallback(
    (mode: TOAST_MODE = 'Info', message: string = '') => {
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

  return { showToast };
};
export default useToast;
