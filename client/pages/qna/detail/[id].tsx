import { GetServerSideProps } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

import {
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { boardApi, queryKeys } from '@/src/entities/qnaboard';

import { getServerCookie } from '@/src/shared/utils';
import { TOKEN_KEYS } from '@/src/shared/const';

// TODO:: 쿠키 파싱 처리하기
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as Params;
  const queryClient = new QueryClient();
  const authToken = getServerCookie(context, TOKEN_KEYS.ACCESS_TOKEN);

  await queryClient.prefetchQuery({
    queryKey: queryKeys.detail(Number(id)),
    queryFn: () => boardApi.getDetailBoard(Number(id), authToken),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export { default } from '@/src/pages/qna/detail';
