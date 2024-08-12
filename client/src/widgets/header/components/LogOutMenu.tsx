import { useCallback } from 'react';

import { useFetchCheckOut } from '@/src/entities/auth/mutations';
import useModal from '@/src/shared/hooks/useModal';

import { BiLogOut } from 'react-icons/bi';

export default function LogoutMenu() {
  const { setModal } = useModal();
  const { mutate: checkOut } = useFetchCheckOut();

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
    <>
      <BiLogOut onClick={handleClick} />
      <span onClick={handleClick}>로그아웃</span>
    </>
  );
}
