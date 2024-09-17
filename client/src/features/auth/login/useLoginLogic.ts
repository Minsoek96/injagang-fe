import { useState, useCallback, useRef } from 'react';

import { hasEmpty } from '@/src/shared/utils';

import { ERROR_MESSAGES } from '@/src/shared/const';
import { authMutations } from '@/src/entities/auth';

const useLoginLogic = () => {
  const { mutate: authenTicate, errorMsg: serverErrorMsg } = authMutations.useFetchSignin();
  const [loginInfo, setLoginInfo] = useState({
    loginId: '',
    password: '',
  });
  const [logicErrorMsg, setLogicErrorMsg] = useState('');

  /**  동적인 input ref를 연결하기 위한 선언 */
  const refs: { [key: string]: React.RefObject<HTMLInputElement> } = {
    loginIdRef: useRef<HTMLInputElement>(null),
    passwordRef: useRef<HTMLInputElement>(null),
  };

  /**  비어있는 인풋을 탐색하고 메시지 알림 */
  const runValidationCheck = () => {
    const emptyfield = hasEmpty.fieldKey(loginInfo);
    if (emptyfield) {
      refs[`${emptyfield}Ref`].current?.focus();
      setLogicErrorMsg(ERROR_MESSAGES.FILL_BLANKS);
      return false;
    }
    return true;
  };

  /** 서버에 로그인 요청 */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (runValidationCheck()) {
      authenTicate(loginInfo);
      setLogicErrorMsg('');
    }
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
    logicErrorMsg,
    handleChange,
    handleSubmit,
    loginIdRef,
    passwordRef,
    serverErrorMsg,
  };
};

export default useLoginLogic;
