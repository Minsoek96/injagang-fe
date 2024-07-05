import { useCallback } from 'react';

import { useFetchCheckOut, useFetchUserInfo } from '@/api/AUTH/mutations';

const useLoginManager = () => {
  const { mutate: getProfile } = useFetchUserInfo();
  const { mutate: checkOut } = useFetchCheckOut();

  const dispatchGetProfile = useCallback(() => {
    getProfile();
  }, []);

  const dispatchCheckOut = useCallback(() => {
    checkOut();
  }, []);

  return { dispatchGetProfile, dispatchCheckOut };
};

export default useLoginManager;
