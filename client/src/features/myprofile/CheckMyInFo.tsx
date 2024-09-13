import styled from 'styled-components';

import { V, styleMixin } from '@/src/shared/styles';
import { Container } from '@/src/shared/ui';
import UserInFo from './UserInfoSetting';
import PassWordInfo from './PassWordSetting';

function CheckMyInFo() {
  const headerTitle = '나의 정보';
  return (
    <CheckMyInFoStyle>
      <MainTitle>{headerTitle}</MainTitle>
      <UserInFo />
      <PassWordInfo />
    </CheckMyInFoStyle>
  );
}

export default CheckMyInFo;

const CheckMyInFoStyle = styled(Container.ItemBase)`
  ${styleMixin.Column()}
  max-width: ${V.lgItemWidth};
  width: 100%;
  gap: 2rem;
`;

const MainTitle = styled.h2`
  font-size: 2.5rem;
  width: 100%;
  border: 0.1em solid ${(props) => props.theme.colors.mainLine};
  padding: 1em;
  border-radius: 0.8rem;

  @media screen and (max-width: ${V.mediaMobile}){
      font-size: 2rem;
    }
`;
