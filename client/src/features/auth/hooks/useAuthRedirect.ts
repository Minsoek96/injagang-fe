import { useEffect } from 'react';

import { useAuthStore } from '@/src/entities/auth';

import { useRouter } from 'next/router';
import { getCookies } from '@/src/shared/utils';

const useAuthRedirect = () => {
  const router = useRouter();
  const { accessToken } = getCookies();
  const { history } = useAuthStore();

  useEffect(() => {
    if (accessToken) {
      router.replace(history ?? '/');
    }
  }, [accessToken]);
};

export default useAuthRedirect;
