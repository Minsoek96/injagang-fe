import styled from 'styled-components';
import { ColBox } from '@/styles/GlobalStyle';

import QuestionComposer from '@/components/QNA/Question/QuestionComposer';

const question = () => (
  <WirteStyle>
    <QuestionComposer />
  </WirteStyle>
);

export default question;

const WirteStyle = styled.div`
  ${ColBox}
  height: 100vh;
  width: 100%;
`;
