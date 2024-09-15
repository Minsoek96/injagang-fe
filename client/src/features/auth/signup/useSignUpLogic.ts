import { useCallback, useRef, useState } from 'react';

import { authMutations } from '@/src/entities/auth';

import { usePwCheck } from '@/src/shared/hooks';
import { hasEmpty } from '@/src/shared/utils';
import { ERROR_MESSAGES } from '@/src/shared/const';

interface joinInfoType {
  [key: string]: string;
  loginId: string;
  password: string;
  confirmPassword: string;
  email: string;
  nickName: string;
}

const useSignUpLogic = () => {
  const [joinInfo, setJoinInfo] = useState<joinInfoType>({
    loginId: '',
    password: '',
    confirmPassword: '',
    email: '',
    nickName: '',
  });
  const [userMsg, setUserMsg] = useState<string | null>('');
  const { isValid, errorMessage } = usePwCheck({ password: joinInfo.password });
  const { mutate: confirmSignUp } = authMutations.useFetchSignup();

  /** ref를 관리 */
  const refs: { [key: string]: React.RefObject<HTMLInputElement> } = {
    loginIdRef: useRef<HTMLInputElement>(null),
    passwordRef: useRef<HTMLInputElement>(null),
    confirmPasswordRef: useRef<HTMLInputElement>(null),
    emailRef: useRef<HTMLInputElement>(null),
    nickNameRef: useRef<HTMLInputElement>(null),
  };

  /** 관리 대상 ref가 비어있는지 체크 */
  const runEmptyChecks = () => {
    const emptyfield = hasEmpty.fieldKey(joinInfo);
    if (emptyfield) {
      refs[`${emptyfield}Ref`].current?.focus();
      return false;
    }
    return true;
  };

  /** 회원가입시 룰을 정의 */
  const validation = [
    {
      check: () => !runEmptyChecks(),
      message: ERROR_MESSAGES.FILL_BLANKS,
    },
    {
      check: () => !isValid,
      message: errorMessage,
    },
    {
      check: () => joinInfo.password !== joinInfo.confirmPassword,
      message: ERROR_MESSAGES.CHECK_PASSWORD,
    },
  ];

  /** 회원가입 시 전체 룰을 검사하고 에러메시지를 반영 */
  const runValidationChecks = () => {
    const isValidation = validation.find((item) => item.check());
    if (isValidation) {
      setUserMsg(isValidation.message);
      return false;
    }
    return true;
  };

  /** 회원 가입 진행 */
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!runValidationChecks()) return;

      const joinData = {
        loginId: joinInfo.loginId,
        password: joinInfo.password,
        passwordCheck: joinInfo.confirmPassword,
        email: joinInfo.email,
        nickname: joinInfo.nickName,
      };
      confirmSignUp(joinData);
    },
    [joinInfo],
  );

  const handleValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setJoinInfo((cur) => ({
        ...cur,
        [name]: value,
      }));
    },
    [],
  );

  return {
    handleSubmit,
    handleValueChange,
    userMsg,
    joinInfo,
    refs,
  };
};

export default useSignUpLogic;
