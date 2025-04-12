import dynamic from 'next/dynamic';

import { useEffect } from 'react';

import styled from 'styled-components';

import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';

import { useCorrectionStore } from '@/src/entities/qnaboard';
import { useFeedStore } from '@/src/entities/feedback';

import { Spinner } from '@/src/shared/ui';
import { styleMixin } from '@/src/shared/styles';

const QuestionDetail = dynamic(
  () => import('./QuestionDetail'),
  {
    loading: () => <Spinner />,
  },
);

const FeedbackComposer = dynamic(
  () => import('@/src/features/feedback-composer/ui/FeedbackComposer'),
  {
    loading: () => <Spinner />,
  },
);

const TargetFeedBackView = dynamic(
  () => import('@/src/features/qna/feedback/TargetFeedBackView'),
  {
    ssr: false,
    loading: () => <Spinner />,
  },
);

type AnswerProps = {
  dehydratedState: DehydratedState;
};

function Answer({ dehydratedState }: AnswerProps) {
  const initTargetFeed = useFeedStore((state) => state.initTargetFeed);
  const initCorrection = useCorrectionStore((state) => state.initCorrection);

  useEffect(
    () => () => {
      initTargetFeed();
      initCorrection();
    },
    [],
  );

  return (
    <ViewStyle>
      <HydrationBoundary state={dehydratedState}>
        <QuestionDetail />
        <FeedbackComposer />
        <TargetFeedBackView />
      </HydrationBoundary>
    </ViewStyle>
  );
}

export default Answer;

const ViewStyle = styled.div`
  ${styleMixin.Column()}
  color: ${(props) => props.theme.colors.boardText};
  width: 100%;
`;
