import styled from 'styled-components';

import { IoDocumentTextOutline, IoPeopleOutline } from 'react-icons/io5';

import { Login } from '@/src/features/auth';
import { styleMixin, V } from '@/src/shared/styles';

function LoginPage() {
  return (
    <Container>
      <Wrapper>
        <PageTitle lang="en">INJAGANG</PageTitle>
        <PageSubTitle>인터뷰와 자소서를 강하게</PageSubTitle>

        <IconContainer>
          <IconWrapper>
            <IconBackground>
              <IoDocumentTextOutline size="2.5rem" color="#ff8800" />
            </IconBackground>
            <IconText>자기소개서</IconText>
          </IconWrapper>

          <IconWrapper>
            <IconBackground>
              <IoPeopleOutline size="2.5rem" color="#ff8800" />
            </IconBackground>
            <IconText>모의면접</IconText>
          </IconWrapper>
        </IconContainer>

        <Login />
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
  transform: rotate(-15deg);
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

const IconContainer = styled.div`
  ${styleMixin.Flex()};
  gap: 5rem;
  margin-bottom: 4rem;
`;

const IconBackground = styled.div`
  ${styleMixin.Column()};
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  background-color: #ffffff;
  border: 1px solid #f0f0f0;
`;

const IconWrapper = styled.div`
  ${styleMixin.Column()};
  align-items: center;
`;

const IconText = styled.p`
  margin-top: 1rem;
  color: #333333;
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: -0.01em;
`;

export default LoginPage;
