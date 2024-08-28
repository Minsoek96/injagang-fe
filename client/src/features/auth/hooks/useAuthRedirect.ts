import { useEffect } from 'react';

import Cookies from 'js-cookie';

import { useAuthStore } from '@/src/entities/auth';

import { TOKEN_KEYS } from '@/src/shared/const';
import { useRouter } from 'next/router';

const useAuthRedirect = () => {
  const router = useRouter();
  const accessToken = Cookies.get(TOKEN_KEYS.ACCESS_TOKEN);
  const { history } = useAuthStore();

  useEffect(() => {
    if (accessToken) {
      router.replace(history ?? '/');
    }
  }, [accessToken]);
};

export default useAuthRedirect;
