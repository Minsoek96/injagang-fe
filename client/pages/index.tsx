import styled from 'styled-components';

import Manual from '@/components/Manual/Manual';

import { styleMixin } from '@/src/shared/styles';
import { useFetchUserInfo } from '@/src/entities/auth/mutations';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const HomeStyle = styled.div`
  ${styleMixin.Column()}
  width: 80vw;
`;

function Home() {
  const { mutate: getProfile } = useFetchUserInfo();

  useEffect(() => {
    if (Cookies.get('userId')) {
      getProfile();
    }
  }, [getProfile]);

  return (
    <HomeStyle>
      <Manual />
    </HomeStyle>
  );
}
export default Home;
