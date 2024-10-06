import { GetServerSideProps } from 'next';

import {
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { queryKeys, boardApi } from '@/src/entities/qnaboard/';

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.lists(1, '', ''),
    queryFn: () => boardApi.getBoardList(1, '', ''),
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export { default } from '@/src/pages/qna/list';
