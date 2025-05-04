import styled from 'styled-components';

import { Login } from '@/src/features/auth';
import { styleMixin, V } from '@/src/shared/styles';

import dynamic from 'next/dynamic';

const AuthErrorDisplay = dynamic(() => import('./ui/AuthErrorDisplay'));

function LoginPage() {
  return (
    <Container>
      <Wrapper>
        <PageTitle lang="en">RelayMentor</PageTitle>
        <PageSubTitle>다음 주자를 위한 첫걸음, 지금 로그인하세요.</PageSubTitle>

        <AuthErrorDisplay />
        <Login />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  ${styleMixin.Column()};
  width: 100%;
  padding: 2rem;
  z-index: 1;
`;

const PageTitle = styled.h1`
  color: ${(props) => props.theme.colors.signatureColor};
  font-size: 4.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 0.5rem;
  text-shadow: ${V.boxShadow2};
`;

const PageSubTitle = styled.p`
  color: ${(props) => props.theme.colors.lightText};
  font-weight: 400;
  font-size: 1.5rem;
  margin-bottom: 4rem;
  letter-spacing: -0.01em;
`;

export default LoginPage;
