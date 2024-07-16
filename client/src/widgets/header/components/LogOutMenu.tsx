import useLoginManager from '@/components/Auth/hooks/useLoginManager';

import useModal from '@/src/shared/hooks/useModal';

import { BiLogOut } from 'react-icons/bi';

export default function LogoutM() {
  const { setModal } = useModal();
  const { dispatchCheckOut } = useLoginManager();

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
