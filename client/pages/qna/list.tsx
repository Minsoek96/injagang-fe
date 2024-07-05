import { GetServerSideProps } from 'next';

import { useEffect } from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import { ColBox, StyleButton } from '@/styles/GlobalStyle';
import { MdOutlineModeEditOutline } from 'react-icons/md';

import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { useBoardStore } from '@/store/qna';
import dynamic from 'next/dynamic';
import { board } from '@/apis/qnaboard/queryKeys';
import { getBoardList } from '@/apis/qnaboard/apis';

const BoardListView = dynamic(
  () => import('@/components/Board/BoardListLayout'),
  { ssr: false },
);

const PageNation = dynamic(() => import('@/components/QNA/PageNation'), {
  ssr: false,
});

const BoardSearch = dynamic(() => import('@/components/QNA/BoardSearch'), {
  ssr: false,
});

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

type ListProps = {
  dehydratedState: DehydratedState;
};

function List({ dehydratedState }: ListProps) {
  const router = useRouter();
  const { initBoardSearch } = useBoardStore();
  useEffect(
    () => () => {
      initBoardSearch();
    },
    [],
  );

  return (
    <ListStyle>
      <StyleButton
        className="edit_btn"
        Size={{ width: '600px', font: '15px' }}
        onClick={() => router.push('/qna/question')}
      >
        <MdOutlineModeEditOutline />
        {' 글쓰기'}
      </StyleButton>
      <HydrationBoundary state={dehydratedState}>
        <BoardListView />
        <PageNation />
        <BoardSearch />
      </HydrationBoundary>
    </ListStyle>
  );
}

export default List;

const ListStyle = styled.div`
  ${ColBox}
  width: 80vw;

  .edit_btn {
    display: flex;
    padding: 8px;
    svg {
      font-size: 20px;
    }
  }
  @media screen and (max-width: 800px) {
    .edit_btn {
      width: 300px;
    }
  }
`;
