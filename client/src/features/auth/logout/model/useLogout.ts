import { authMutations } from '@/src/entities/auth';
import { useModal } from '@/src/shared/hooks';
import { useCallback } from 'react';

/** 로그아웃 커스텀훅 */
export default function useLogout() {
  const { setModal } = useModal();
  const { mutate: checkOut } = authMutations.useFetchCheckOut();
  const checkMemo = useCallback(() => {
    checkOut();
  }, []);

  const onCheckOut = useCallback(() => {
    setModal({
      onAction: checkMemo,
      title: 'Message',
      message: '정말 로그아웃을 원하시나요?',
    });
  }, []);

  return { onCheckOut };
}
