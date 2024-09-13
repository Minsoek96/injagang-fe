import { useEffect } from 'react';

import { useFetchUserInfo } from '@/src/entities/auth/mutations';
import { useAuthStore } from '@/src/entities/auth';

import { getCookies } from '@/src/shared/utils/';

/** 토큰 검증을 위한 훅 */
const useAuth = () => {
  const { mutate: getProfile } = useFetchUserInfo();
  const { userId, role } = useAuthStore();
  const { accessToken } = getCookies();

  useEffect(() => {
    if (accessToken) {
      getProfile();
    }
  }, [userId, getProfile, accessToken]);

  const isVerify = !!role;

  return isVerify;
};

export default useAuth;
