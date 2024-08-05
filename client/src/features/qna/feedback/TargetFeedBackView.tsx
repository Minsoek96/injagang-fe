import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';
import { useFetchFeedBackList } from '@/src/entities/feedback/queries';
import { useReviseFeed } from '@/src/entities/feedback/mutation';

import { Container } from '@/src/shared/components';
import TargetFeedBackItems from './TargetFeedBackItems';

import userQnaManager from '../hooks/userQnaManager';

function TargetFeedBackView() {
  const { targetFeed } = userQnaManager();
  const { data: feedbackList } = useFetchFeedBackList(targetFeed);
  const { mutate: updateFeed } = useReviseFeed(targetFeed);

  return (
    <FeedBackViewStyle>
      <FeedBackTitle>↓FeedBack↓</FeedBackTitle>
      {feedbackList?.map((feedback) => (
        <TargetFeedBackItems
          key={feedback.feedbackId}
          handleUpdateFeedBack={updateFeed}
          target={feedback.target}
          owner={feedback.owner}
          content={feedback.content}
          feedbackId={feedback.feedbackId}
        />
      ))}
    </FeedBackViewStyle>
  );
}

export default TargetFeedBackView;

const FeedBackViewStyle = styled(Container.ItemBase)`
  ${styleMixin.Column('flex-start')}
  margin-top: 3rem;
  height: 100%;
  width: 100%;

  > article {
    margin-bottom: 3rem;
  }
`;

const FeedBackTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 3rem;
`;
