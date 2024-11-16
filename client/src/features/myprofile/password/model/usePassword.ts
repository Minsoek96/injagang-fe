import { useCallback } from 'react';

import { authMutations, authType } from '@/src/entities/auth';

import { MODAL_MESSAGES } from '@/src/shared/const';
import { useModal } from '@/src/shared/hooks';

const usePassword = () => {
  const { mutate: confirmChangePw } = authMutations.useChangePassWord();

  const { setModal } = useModal();

  const confirmChangePassword = useCallback(
    ({ nowPassword, changePassword, changePasswordCheck }: authType.IChangePw) => {
      setModal({
        onAction: () =>
          confirmChangePw({
            nowPassword,
            changePassword,
            changePasswordCheck,
          }),
        title: MODAL_MESSAGES.MSG,
        message: '비밀번호 : **** 변경하시겠습니까?',
      });
    },
    [],
  );

  return {
    confirmChangePassword,
  };
};

export default usePassword;
