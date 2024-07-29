import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';

import { useAuth } from '@/src/shared/hooks';
import { Manual } from '@/src/features/manual';

const HomeStyle = styled.div`
  ${styleMixin.Column()}
  width: 80vw;
`;

function Home() {
  useAuth();

  return (
    <HomeStyle>
      <Manual />
    </HomeStyle>
  );
}
export default Home;
