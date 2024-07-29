import styled from 'styled-components';

import { CheckMyInFo } from '@/src/features/myprofile';

import { styleMixin } from '@/src/shared/styles';

const myProfile = () => (
  <MyPageStyle>
    <CheckMyInFo />
  </MyPageStyle>
);

export default myProfile;

const MyPageStyle = styled.div`
  ${styleMixin.Column()}
  width: 100%;
  height: 100%;
`;
