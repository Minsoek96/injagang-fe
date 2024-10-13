import styled from 'styled-components';

import { styleMixin, V } from '@/src/shared/styles';
import { PassWordSetting, UserInfoSetting } from '@/src/features/myprofile';
import { Container } from '@/src/shared/ui';

const myProfile = () => {
  const headerTitle = '나의 정보';
  return (
    <MyPageStyle>
      <Wrapper>
        <MainTitle>{headerTitle}</MainTitle>
        <UserInfoSetting />
        <PassWordSetting />
      </Wrapper>
    </MyPageStyle>

  );
};
export default myProfile;

const MyPageStyle = styled.div`
  ${styleMixin.Column()}
  width: 100%;
`;

const Wrapper = styled(Container.ItemBase)`
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
