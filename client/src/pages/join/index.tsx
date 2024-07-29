import styled from 'styled-components';

import { SignUp } from '@/src/features/auth';

import { styleMixin } from '@/src/shared/styles';

function SignupPage() {
  return (
    <JoinStyle>
      <SignUp />
    </JoinStyle>
  );
}

export default SignupPage;

const JoinStyle = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  ${styleMixin.Flex()};
  height: 100vh;
  width: 100vw;
  background-color: #31404e;
  color: ${({ theme }) => theme.colors.text};
`;
