import { useState } from 'react';

import { authType } from '@/src/entities/auth';

const useMyProfileLogic = () => {
  const [passWordInfo, setPassWordInfo] = useState<authType.IChangePw>({
    nowPassword: '',
    changePassword: '',
    changePasswordCheck: '',
  });

  const handleInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPassWordInfo((cur) => ({
      ...cur,
      [name]: value,
    }));
  };

  return { passWordInfo, handleInfoChange };
};

export default useMyProfileLogic;
