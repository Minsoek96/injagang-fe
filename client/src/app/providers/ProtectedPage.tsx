import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useToast } from '@/src/shared/hooks';

import { ERROR_MESSAGES, TOAST_MODE } from '@/src/shared/const';
import { useAuthStore } from '@/src/entities/auth';
import { getCookies } from '@/src/shared/utils';

export default function ProtectedPage() {
  const router = useRouter();

  const { showToast } = useToast();
  const { setHistory } = useAuthStore();

  const { accessToken } = getCookies();

  useEffect(() => {
    if (!accessToken) {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.PROTECTED_PAGE);
      setHistory(router.asPath);
      router.replace('/login');
    }
  }, []);
  return null;
}
