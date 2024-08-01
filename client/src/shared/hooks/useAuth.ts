import { useEffect } from 'react';

import Cookies from 'js-cookie';

import { useFetchUserInfo } from '@/src/entities/auth/mutations';
import { TOKEN_KEYS } from '@/src/shared/const';
import { useAuthStore } from '@/src/entities/auth';

// 인증을 위한 훅
const useAuth = () => {
  const { mutate: getProfile, isSuccess } = useFetchUserInfo();
  const { userId } = useAuthStore();
  useEffect(() => {
    const accessToken = Cookies.get(TOKEN_KEYS.ACCESS_TOKEN);
    if (!accessToken) {
      return;
    }
    getProfile();
  }, [userId]);

  return isSuccess;
};

export default useAuth;
