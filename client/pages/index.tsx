import styled from 'styled-components';

import Manual from '@/components/Manual/Manual';

import { ColBox } from '@/styles/GlobalStyle';
import { useFetchUserInfo } from '@/src/entities/auth/mutations';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const HomeStyle = styled.div`
  ${ColBox}
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
