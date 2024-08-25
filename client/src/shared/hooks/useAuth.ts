import { useEffect } from 'react';

import Cookies from 'js-cookie';

import { useFetchUserInfo } from '@/src/entities/auth/mutations';
import { useAuthStore } from '@/src/entities/auth';

import { TOKEN_KEYS } from '@/src/shared/const';

// 인증을 위한 훅
const useAuth = () => {
  const { mutate: getProfile } = useFetchUserInfo();
  const { userId, role } = useAuthStore();

  useEffect(() => {
    const accessToken = Cookies.get(TOKEN_KEYS.ACCESS_TOKEN);
    if (accessToken) {
      getProfile();
    }
  }, [userId, getProfile]);

  const isVerify = !!role;

  return isVerify;
};

export default useAuth;
