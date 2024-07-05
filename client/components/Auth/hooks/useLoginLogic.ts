import { useState, useCallback, useRef } from 'react';

import { hasEmptyFieldKey } from '@/util/hasEmpty';

import { ERROR_MESSAGES } from '@/constants';
import { useFetchSignin } from '@/apis/auth/mutations';

const useLoginLogic = () => {
  const { mutate: authenTicate, errorMsg: loginErrorMsg } = useFetchSignin();
  const [loginInfo, setLoginInfo] = useState({
    loginId: '',
    password: '',
  });
  const [userLogicMsg, setUserLogicMsg] = useState('');
  const refs: { [key: string]: React.RefObject<HTMLInputElement> } = {
    loginIdRef: useRef<HTMLInputElement>(null),
    passwordRef: useRef<HTMLInputElement>(null),
  };

  const runValidationCheck = () => {
    const emptyfield = hasEmptyFieldKey(loginInfo);
    if (emptyfield) {
      refs[`${emptyfield}Ref`].current?.focus();
      setUserLogicMsg(ERROR_MESSAGES.FILL_BLANKS);
      return false;
    }
    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runValidationCheck() && authenTicate(loginInfo);
    setUserLogicMsg('');
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setLoginInfo((cur) => ({
        ...cur,
        [name]: value,
      }));
    },
    [],
  );

  const { loginIdRef, passwordRef } = refs;
  return {
    loginInfo,
    userLogicMsg,
    handleChange,
    handleSubmit,
    loginIdRef,
    passwordRef,
    loginErrorMsg,
  };
};

export default useLoginLogic;
