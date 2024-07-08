import { useEffect } from 'react';

import Cookies from 'js-cookie';

import { useFetchUserInfo } from '@/apis/auth/mutations';
import { TOKEN_KYES } from '@/constants';

// 인증을 위한 훅
const useAuth = () => {
  const { mutate: getProfile, isSuccess } = useFetchUserInfo();

  useEffect(() => {
    const accessToken = Cookies.get(TOKEN_KYES.ACCESS_TOKEN);
    if (!accessToken) {
      return;
    }
    getProfile();
  }, []);

  return isSuccess;
};

export default useAuth;
