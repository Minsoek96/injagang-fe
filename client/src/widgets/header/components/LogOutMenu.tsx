import { useCallback } from 'react';

import { BiLogOut } from 'react-icons/bi';

import { authMutations } from '@/src/entities/auth';
import { useModal } from '@/src/shared/hooks/';
import { DropBoxStyle } from '@/src/shared/ui';

export default function LogoutMenu() {
  const { setModal } = useModal();
  const { mutate: checkOut } = authMutations.useFetchCheckOut();

  const dispatchCheckOut = useCallback(() => {
    checkOut();
  }, []);

  const handleClick = () => {
    setModal({
      onAction: dispatchCheckOut,
      contents: {
        title: 'Message',
        message: '정말 로그아웃을 원하시나요?',
      },
    });
  };

  return (
    <DropBoxStyle.ItemWrapper onClick={handleClick}>
      <BiLogOut />
      <span>로그아웃</span>
    </DropBoxStyle.ItemWrapper>
  );
}
