import dynamic from 'next/dynamic';

import { useEffect } from 'react';

import {
  DehydratedState,
  HydrationBoundary,
} from '@tanstack/react-query';

import styled from 'styled-components';
import { styleMixin } from '@/src/shared/styles';

import { Spinner } from '@/src/shared/components/spinner';

import { useFeedStore } from '@/src/entities/qnaboard';

const AnswerLayout = dynamic(
  () => import('@/src/features/qna/Answer/AnswerLayout'),
  {
    ssr: false,
    loading: () => <Spinner />,
  },
);

type AnswerProps = {
    dehydratedState: DehydratedState;
  };

function Answer({ dehydratedState }: AnswerProps) {
  const { initTargetFeed } = useFeedStore();
  useEffect(
    () => () => {
      initTargetFeed();
    },
    [],
  );

  return (
    <ViewStyle>
      <HydrationBoundary state={dehydratedState}>
        <AnswerLayout />
      </HydrationBoundary>
    </ViewStyle>
  );
}

export default Answer;

const ViewStyle = styled.div`
    ${styleMixin.Column()}
    width: 100%;
    height: 100vh;
  `;
