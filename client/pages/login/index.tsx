import styled from 'styled-components';

import Login from '@/components/Auth/Login';

import { styleMixin } from '@/src/shared/styles';

function LoginPage() {
  return (
    <LoginStyle>
      <Login />
    </LoginStyle>
  );
}

export default LoginPage;

const LoginStyle = styled.div`
  z-index: 1;
  ${styleMixin.Flex()};
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #31404e;
  color: ${({ theme }) => theme.colors.text};
`;
