import styled from 'styled-components';

import { IoDocumentTextOutline, IoPeopleOutline } from 'react-icons/io5';

import { Login } from '@/src/features/auth';
import { styleMixin, V } from '@/src/shared/styles';

function LoginPage() {
  return (
    <Container>
      <Wrapper>
        <PageTitle lang="en">RelayMentor</PageTitle>
        <PageSubTitle>다음 주자를 위한 첫걸음, 지금 로그인하세요.</PageSubTitle>

        <IconContainer>
          <IconWrapper>
            <IconBackground>
              <IoDocumentTextOutline />
            </IconBackground>
            <IconText>자기소개서</IconText>
          </IconWrapper>

          <IconWrapper>
            <IconBackground>
              <IoPeopleOutline />
            </IconBackground>
            <IconText>모의면접</IconText>
          </IconWrapper>
        </IconContainer>

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

  svg {
    color: ${(props) => props.theme.colors.signatureColor};
    font-size: 2.5rem;
  }
`;

const IconWrapper = styled.div`
  ${styleMixin.Column()};
  align-items: center;
`;

const IconText = styled.p`
  margin-top: 1rem;
  color: ${(props) => props.theme.colors.lightText};
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: -0.01em;
`;

export default LoginPage;
