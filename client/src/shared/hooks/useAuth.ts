import { useEffect } from 'react';

import Cookies from 'js-cookie';

import { useFetchUserInfo } from '@/src/entities/auth/mutations';
import { TOKEN_KEYS } from '@/src/shared/const';

// 인증을 위한 훅
const useAuth = () => {
  const { mutate: getProfile, isSuccess } = useFetchUserInfo();

  useEffect(() => {
    const accessToken = Cookies.get(TOKEN_KEYS.ACCESS_TOKEN);
    if (!accessToken) {
      return;
    }
    getProfile();
  }, []);

  return isSuccess;
};

export default useAuth;
