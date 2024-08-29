import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useToast } from '@/src/shared/hooks';

import { ERROR_MESSAGES, TOAST_MODE, TOKEN_KEYS } from '@/src/shared/const';
import { useAuthStore } from '@/src/entities/auth';
import Cookies from 'js-cookie';

export default function ProtectedPage() {
  const accessToken = Cookies.get(TOKEN_KEYS.ACCESS_TOKEN);
  const router = useRouter();
  const { showToast } = useToast();
  const { setHistory } = useAuthStore();
  useEffect(() => {
    if (!accessToken) {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.PROTECTED_PAGE);
      setHistory(router.asPath);
      router.replace('/login');
    }
  }, []);
  return null;
}
