import { GetServerSideProps } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import dynamic from 'next/dynamic';

import { useEffect } from 'react';

import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import styled from 'styled-components';
import { ColBox } from '@/styles/GlobalStyle';

import Spinner from '@/components/Spinner';

import board from '@/src/entities/qnaboard/queryKeys';
import { boardApi, useFeedStore } from '@/src/entities/qnaboard';

import { getServerCookie } from '@/src/shared/utils';
import { TOKEN_KYES } from '@/src/shared/const';

const AnswerLayout = dynamic(
  () => import('@/components/QNA/Answer/AnswerLayout'),
  {
    ssr: false,
    loading: () => <Spinner />,
  },
);

// TODO:: 쿠키 파싱 처리하기
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as Params;
  const queryClient = new QueryClient();
  const authToken = getServerCookie(context, TOKEN_KYES.ACCESS_TOKEN);

  await queryClient.prefetchQuery({
    queryKey: board.detail(Number(id)),
    queryFn: () => boardApi.getDetailBoard(Number(id), authToken),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

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
  ${ColBox}
  width: 100%;
  height: 100vh;
`;
