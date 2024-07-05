import { useState } from 'react';

export interface IPassWordInfo {
  nowPassword: string;
  changePassword: string;
  changePasswordCheck: string;
}

const useMyProfileLogic = () => {
  const [passWordInfo, setPassWordInfo] = useState<IPassWordInfo>({
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
