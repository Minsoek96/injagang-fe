import styled from 'styled-components';

import { SignUp } from '@/src/features/auth';

import { styleMixin, V } from '@/src/shared/styles';

function SignupPage() {
  return (
    <Container>
      <Wrapper>
        <PageTitle>INJAGANG</PageTitle>
        <PageSubTitle>인터뷰와 자소서를 강하게</PageSubTitle>
        <SignUp />
      </Wrapper>
      <BackgroundGradient />
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

const BackgroundGradient = styled.div`
  position: fixed;
  top: -10%;
  right: -5%;
  width: 50%;
  height: 120%;
  background: linear-gradient(
    135deg,
    rgba(255, 136, 0, 0.03) 0%,
    rgba(224, 0, 0, 0.03) 100%
  );
  z-index: 0;
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
  color: #666666;
  font-weight: 400;
  font-size: 1.5rem;
  margin-bottom: 4rem;
  letter-spacing: -0.01em;
`;

export default SignupPage;
