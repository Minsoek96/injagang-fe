import styled from 'styled-components';

import { SignUp } from '@/src/features/auth';

import { styleMixin, V } from '@/src/shared/styles';

function SignupPage() {
  return (
    <Container>
      <Wrapper>
        <PageTitle>RelayMentor</PageTitle>
        <PageSubTitle>당신의 경험이 누군가의 성공으로 이어집니다.</PageSubTitle>
        <SignUp />
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
  align-items: center;
  justify-content: center;
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

export default SignupPage;
