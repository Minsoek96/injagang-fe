import styled from 'styled-components';

import { ColBox, FlexBox } from '@/styles/GlobalStyle';
import V from '@/styles/variables';
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
  display: ${ColBox};
`;

const CheckMyInFoStyle = styled.div`
  ${ColBox}
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
  ${FlexBox}
  gap:15px;
  width: 100%;
  height: 90%;
  @media screen and (max-width: 900px) {
    ${ColBox}
  }
`;
