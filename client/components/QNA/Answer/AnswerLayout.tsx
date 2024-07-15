import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';

import TargetFeedBackView from '@/components/QNA/Answer/TargetFeedBack/TargetFeedBackView';
import AnswerDetailView from './AnswerDetail/AnswerDetailView';
import FeedBackComposer from './FeedBack/FeedBackComposer';

function AnswerLayout() {
  return (
    <AnswerWirteStyle>
      <AnswerDetailView />
      <FeedBackComposer />
      <TargetFeedBackView />
    </AnswerWirteStyle>
  );
}

export default AnswerLayout;

const AnswerWirteStyle = styled.div`
  ${styleMixin.Column()}
  width: 100%;
  height: 90%;
  gap: 30px;
`;
