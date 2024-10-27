import { useCallback } from 'react';

import { authMutations } from '@/src/entities/auth';

import { useModal } from '@/src/shared/hooks';
import { MODAL_MESSAGES } from '@/src/shared/const';

const useNick = () => {
  const { mutate: confirmNickNameChange } = authMutations.useChangeNick();
  const { setModal } = useModal();

  const changeNickname = useCallback((nickName: string) => {
    setModal({
      onAction: () => confirmNickNameChange(nickName),
      contents: {
        title: MODAL_MESSAGES.MSG,
        message: `닉네임 : ${nickName} 변경하시겠습니까?`,
      },
    });
  }, []);

  return {
    changeNickname,
  };
};

export default useNick;
