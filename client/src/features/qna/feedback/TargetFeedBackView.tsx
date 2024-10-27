import styled from 'styled-components';

import { feedbackMutation, feedbackQueries } from '@/src/entities/feedback';

import { styleMixin, V } from '@/src/shared/styles';
import { Container } from '@/src/shared/ui';

import TargetFeedBackItems from './TargetFeedBackItems';

type Props = {
  targetFeed: number
}

/** TargetFeedBackView 피드백 조회
 *
 * 선택된 피드백의 내용을 조회
 * 등록된 피드백이 없는 경우 경고
 */
function TargetFeedBackView({ targetFeed }:Props) {
  const { data: feedbackList } = feedbackQueries.useFetchFeedBackList(targetFeed);
  const { mutate: updateFeed } = feedbackMutation.useReviseFeed(targetFeed);
  const { mutate: deleteFeed } = feedbackMutation.useDeleteFeed(targetFeed);

  if (!feedbackList?.length) {
    return (
      <FeedBackViewStyle>
        <EmptyFeedBackTitle>
          {targetFeed
            ? '등록된 피드백이 없습니다'
            : '자소서 넘버를 선택해주세요.'}
        </EmptyFeedBackTitle>
      </FeedBackViewStyle>
    );
  }

  return (
    <FeedBackViewStyle>
      <FeedBackTitle>↓FeedBack↓</FeedBackTitle>
      {feedbackList?.map((feedback) => (
        <TargetFeedBackItems
          key={feedback.feedbackId}
          handleUpdateFeedBack={updateFeed}
          handleDeleteFeedBack={deleteFeed}
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

const EmptyFeedBackTitle = styled(FeedBackTitle)`
  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.8rem;
  }
`;
