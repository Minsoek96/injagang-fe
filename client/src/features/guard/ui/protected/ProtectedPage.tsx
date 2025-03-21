import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useToast } from '@/src/shared/hooks';

import { ERROR_MESSAGES, TOAST_MODE } from '@/src/shared/const';
import { useAuthStore } from '@/src/entities/auth';
import { getCookies } from '@/src/shared/utils';

import { GlobalLoading } from '@/src/shared/ui';

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

  return <GlobalLoading text="보호된 페이지 접근을 위해 사용자 인증을 확인 중입니다" />;
}
