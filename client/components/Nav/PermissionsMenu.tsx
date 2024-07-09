import { useEffect } from 'react';

import styled from 'styled-components';

import { useRouter } from 'next/router';

import { BiLogOut, BiLogIn } from 'react-icons/bi';

import { FlexBox } from '@/styles/GlobalStyle';
import useAuthStore from '@/store/auth/useAuthStore';
import { useFetchUserInfo } from '@/apis/auth/mutations';
import Cookies from 'js-cookie';
import { ModalProps } from '@/types/modal/ModalType';
import useLoginManager from '../Auth/hooks/useLoginManager';
import { AdminMenu, NavContainer } from './MenuItems';

interface PermissionMenuProps {
  setModal: (modalProps: ModalProps) => void;
}

function PermissionsMenu({ setModal }: PermissionMenuProps) {
  const { userId, role } = useAuthStore();
  const { dispatchCheckOut } = useLoginManager();
  const router = useRouter();
  const { mutate: getProfile } = useFetchUserInfo();

  useEffect(() => {
    if (Cookies.get('userId')) {
      getProfile();
    }
  }, [userId]);

  return (
    <Container>
      {role === 'ADMIN' && <AdminMenu />}
      <NavContainer>
        {role === null ? (
          <LogMenu>
            <BiLogIn onClick={() => router.push('/login')} />
            <span className="navitem_title">Login</span>
          </LogMenu>
        ) : (
          <LogMenu>
            <BiLogOut
              onClick={() =>
                setModal({
                  onAction: dispatchCheckOut,
                  contents: {
                    title: 'Message',
                    message: '정말 로그아웃을 원하시나요?',
                  },
                })}
            />
            <span className="navitem_title">LogOut</span>
          </LogMenu>
        )}
      </NavContainer>
    </Container>
  );
}

export default PermissionsMenu;
const Container = styled.div``;
const LogMenu = styled.div`
  ${FlexBox}
  gap: 30px;
`;
