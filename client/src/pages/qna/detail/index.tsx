import dynamic from 'next/dynamic';

import { Suspense, useEffect } from 'react';

import styled from 'styled-components';

import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';

import { useCorrectionStore } from '@/src/entities/qnaboard';
import { useFeedStore } from '@/src/entities/feedback';

import { ErrorBoundary, MainButton, Spinner } from '@/src/shared/ui';
import { styleMixin } from '@/src/shared/styles';
import { ArticleCard } from '@/src/shared/ui/container/Container';

const QuestionDetail = dynamic(
  () => import('@/src/widgets/qna/ui/detail-layout/QuestionDetailLayout'),
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
        <ErrorBoundary
          renderFallback={(error, reset) =>
            ErrorFallback(error, reset, '게시글을 조회 중 문제가 발생했습니다.')}
        >
          <Suspense fallback={<Spinner message="게시글을 조회 중 입니다." />}>
            <QuestionDetail />
            <FeedbackComposer />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary
          renderFallback={(error, reset) =>
            ErrorFallback(error, reset, '피드백을 조회 중 문제가 발생했습니다.')}
        >
          <Suspense fallback={<Spinner message="피드백을 조회 중 입니다." />}>
            <TargetFeedBackView />
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </ViewStyle>
  );
}

export default Answer;

function ErrorFallback(_: Error, reset: () => void, message: string) {
  return (
    <ArticleCard
      $size={{
        width: '100%',
        height: '100%',
        isMedia: true,
      }}
    >
      <ErrorContainer>
        <h3>앗! 문제가 발생했어요.</h3>
        <p>{message}</p>
        <p>불편을 드려 정말 죄송합니다.🙇‍♂️🙇‍♂️🙇‍♂️</p>
        <MainButton
          label="복구 시도"
          onClick={reset}
          variant="signature"
        />
      </ErrorContainer>
    </ArticleCard>
  );
}

const ViewStyle = styled.div`
  ${styleMixin.Column()}
  color: ${(props) => props.theme.colors.boardText};
  width: 100%;
`;

const ErrorContainer = styled.div`
  ${styleMixin.Column()}
  margin-block: 2rem;
  text-align: center;
  gap: 2rem;

  p {
    font-size: 1.6rem;
    line-height: 1;
  }

  h3 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;
