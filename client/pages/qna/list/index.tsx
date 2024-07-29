import { GetServerSideProps } from 'next';

import {
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import board from '@/src/entities/qnaboard/queryKeys';
import { getBoardList } from '@/src/entities/qnaboard/apis';

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: board.lists(1, '', ''),
    queryFn: () => getBoardList(1, '', ''),
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export { default } from '@/src/pages/qna/list';
