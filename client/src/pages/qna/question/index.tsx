import styled from 'styled-components';

import { QuestionComposer } from '@/src/features/question-composer';

import { styleMixin } from '@/src/shared/styles';

const question = () => (
  <WirteStyle>
    <QuestionComposer />
  </WirteStyle>
);

export default question;

const WirteStyle = styled.div`
  ${styleMixin.Column('flex-start')}
  width: 100%;
`;
