import styled from 'styled-components';
import { styleMixin } from '@/src/shared/styles';

import { QuestionComposer } from '@/src/features/question-composer';

const question = () => (
  <WirteStyle>
    <QuestionComposer />
  </WirteStyle>
);

export default question;

const WirteStyle = styled.div`
  ${styleMixin.Column()}
  height: 100vh;
  width: 100%;
`;
