import { useCallback } from 'react';

import { useModal } from '@/src/shared/hooks';

import { runValidationChecks, hasEmpty } from '@/src/shared/utils';
import { ERROR_MESSAGES, MODAL_MESSAGES } from '@/src/shared/const';
import { authType, authMutations } from '@/src/entities/auth';

const validation = {
  password: ({
    nowPassword,
    changePassword,
    changePasswordCheck,
  }: authType.IChangePw) => [
    {
      check: () =>
        hasEmpty.fields({ nowPassword, changePassword, changePasswordCheck }),
      message: ERROR_MESSAGES.FILL_BLANKS,
    },
    {
      check: () => changePassword !== changePasswordCheck,
      message: ERROR_MESSAGES.CHECK_PASSWORD,
    },
  ],
  nick: (nickName: string) => [
    {
      check: () => nickName === '',
      message: ERROR_MESSAGES.EMPTY_NICK,
    },
  ],
};

const useMyProfileManager = () => {
  const { mutate: changeNickname } = authMutations.useChangeNick();
  const { mutate: confirmChangePw } = authMutations.useChangePassWord();

  const { setModal } = useModal();

  // PASSWORD DOMAIN
  const dispatchPasswordChange = useCallback(
    ({ nowPassword, changePassword, changePasswordCheck }: authType.IChangePw) => {
      setModal({
        onAction: () =>
          confirmPassWordChange({
            nowPassword,
            changePassword,
            changePasswordCheck,
          }),
        contents: {
          title: MODAL_MESSAGES.MSG,
          message: '비밀번호 : **** 변경하시겠습니까?',
        },
      });
    },
    [],
  );

  const confirmPassWordChange = ({
    nowPassword,
    changePassword,
    changePasswordCheck,
  }: authType.IChangePw) => {
    const validationErrorMsg = runValidationChecks(
      validation.password({
        nowPassword,
        changePassword,
        changePasswordCheck,
      }),
    );
    validationErrorMsg
      ? commonValidationFailure(validationErrorMsg)
      : passwordValidationSuccess({
        nowPassword,
        changePassword,
        changePasswordCheck,
      });
  };

  const passwordValidationSuccess = ({
    nowPassword,
    changePassword,
    changePasswordCheck,
  }: authType.IChangePw) => {
    confirmChangePw({ nowPassword, changePassword, changePasswordCheck });
  };

  // NICKNAME DOMAIN
  const dispatchNickNameChange = useCallback((nickName: string) => {
    setModal({
      onAction: () => confirmNickNameChange(nickName),
      contents: {
        title: MODAL_MESSAGES.MSG,
        message: `닉네임 : ${nickName} 변경하시겠습니까?`,
      },
    });
  }, []);

  const confirmNickNameChange = useCallback((nickName: string) => {
    const validationErrorMsg = runValidationChecks(validation.nick(nickName));
    validationErrorMsg
      ? commonValidationFailure(validationErrorMsg)
      : nicknameValidationSuccess(nickName);
  }, []);

  const nicknameValidationSuccess = (nickName: string) => {
    changeNickname(nickName);
  };

  const commonValidationFailure = (errorMsg: string) => {
    setModal({
      contents: {
        title: MODAL_MESSAGES.WARNING,
        message: errorMsg,
      },
    });
  };

  return {
    dispatchPasswordChange,
    dispatchNickNameChange,
  };
};

export default useMyProfileManager;
