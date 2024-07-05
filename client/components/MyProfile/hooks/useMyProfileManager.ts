import { useCallback } from 'react';

import useModal from '@/hooks/useModal';

import runValidationChecks from '@/util/runValidationChecks';
import { hasEmptyFields } from '@/util/hasEmpty';
import { ERROR_MESSAGES, MODAL_MESSAGES } from '@/constants';
import { useChangeNick, useChangePassWord } from '@/apis/auth/mutations';
import { IPassWordInfo } from './useMyProfileLogic';

const validation = {
  password: ({
    nowPassword,
    changePassword,
    changePasswordCheck,
  }: IPassWordInfo) => [
    {
      check: () =>
        hasEmptyFields({ nowPassword, changePassword, changePasswordCheck }),
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
  const { mutate: changeNickname } = useChangeNick();
  const { mutate: confirmChangePw } = useChangePassWord();

  const { Modal, setModal } = useModal();

  // PASSWORD DOMAIN
  const dispatchPasswordChange = useCallback(
    ({ nowPassword, changePassword, changePasswordCheck }: IPassWordInfo) => {
      setModal({
        onAction: () =>
          confirmPassWordChange({
            nowPassword,
            changePassword,
            changePasswordCheck,
          }),
        contents: {
          title: MODAL_MESSAGES.MSG,
          content: '비밀번호 : **** 변경하시겠습니까?',
        },
      });
    },
    [],
  );

  const confirmPassWordChange = ({
    nowPassword,
    changePassword,
    changePasswordCheck,
  }: IPassWordInfo) => {
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
  }: IPassWordInfo) => {
    confirmChangePw({ nowPassword, changePassword, changePasswordCheck });
  };

  // NICKNAME DOMAIN
  const dispatchNickNameChange = useCallback((nickName: string) => {
    setModal({
      onAction: () => confirmNickNameChange(nickName),
      contents: {
        title: MODAL_MESSAGES.MSG,
        content: `닉네임 : ${nickName} 변경하시겠습니까?`,
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
        content: errorMsg,
      },
    });
  };

  return {
    dispatchPasswordChange,
    dispatchNickNameChange,
    Modal,
  };
};

export default useMyProfileManager;
