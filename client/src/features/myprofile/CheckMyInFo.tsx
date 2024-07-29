import styled from 'styled-components';

import { V, styleMixin } from '@/src/shared/styles';
import UserInFo from './UserInfoSetting';
import PassWordInfo from './PassWordSetting';

function CheckMyInFo() {
  const headerTitle = '나의 정보';
  return (
    <CheckMyInFoStyle>
      <Container>
        <MainTitle>{headerTitle}</MainTitle>
        <SwitchContainer>
          <UserInFo />
          <PassWordInfo />
        </SwitchContainer>
      </Container>
    </CheckMyInFoStyle>
  );
}

export default CheckMyInFo;

const Container = styled.div`
  display: ${styleMixin.Column()};
`;

const CheckMyInFoStyle = styled.div`
  ${styleMixin.Column()}
  width: ${V.lgWidth};
  height: 400px;
  h3 {
    margin-top: 20px;
    margin-bottom: 15px;
  }

  @media screen and (max-width: 900px) {
    width: ${V.smWidth};
    height: 700px;
  }
`;

const MainTitle = styled.h2`
  margin-bottom: 15px;
`;

const SwitchContainer = styled.div`
  ${styleMixin.Flex()}
  gap:15px;
  width: 100%;
  height: 90%;
  @media screen and (max-width: 900px) {
    ${styleMixin.Column()}
  }
`;
