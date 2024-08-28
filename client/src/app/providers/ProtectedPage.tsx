import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useToast } from '@/src/shared/hooks';

import { ERROR_MESSAGES, TOAST_MODE } from '@/src/shared/const';
import { useAuthStore } from '@/src/entities/auth';

export default function ProtectedPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { setHistory } = useAuthStore();
  useEffect(() => {
    showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.PROTECTED_PAGE);
    setHistory(router.asPath);
    router.replace('/login');
  }, []);
  return null;
}
