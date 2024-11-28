import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';

import { Manual } from '@/src/widgets/manual';

function Home() {
  return (
    <HomeStyle>
      <Manual />
    </HomeStyle>
  );
}
export default Home;

const HomeStyle = styled.div`
  ${styleMixin.Column()}
  width: 100%;
`;
