import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';

import TargetFeedBackView from '@/src/features/qna/Answer/TargetFeedBack/TargetFeedBackView';
import { FeedBackComposer } from '@/src/features/feedback';
import AnswerDetailView from './AnswerDetail/AnswerDetailView';

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
