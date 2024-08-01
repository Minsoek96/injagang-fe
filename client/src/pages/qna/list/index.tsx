import { useEffect } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';

import styled from 'styled-components';

import { MdOutlineModeEditOutline } from 'react-icons/md';

import { boardQueries, useBoardStore } from '@/src/entities/qnaboard';

import { BaseButton } from '@/src/shared/components/button';
import { styleMixin } from '@/src/shared/styles';

import {
  HEAD_ITEM,
  ID_KEY,
  ROUTE_TEMPLATE,
  TABLE_KEYS,
} from '@/src/pages/qna/list/const';

const BoardListView = dynamic(
  () => import('@/src/widgets/board/BoardListLayout'),
  { ssr: false },
);

const PageNation = dynamic(() => import('@/src/features/qna/PageNation'), {
  ssr: false,
});

const BoardSearch = dynamic(() => import('@/src/features/qna/BoardSearch'), {
  ssr: false,
});

type ListProps = {
  dehydratedState: DehydratedState;
};

function List({ dehydratedState }: ListProps) {
  const router = useRouter();
  const { data } = boardQueries.useFetchBoardList();
  const { initBoardSearch, setTotalPage } = useBoardStore();

  useEffect(() => {
    if (data?.boardInfos) {
      const total = data.totalPage;
      setTotalPage(total);
    }
    return () => initBoardSearch();
  }, [data]);

  return (
    <ListStyle>
      <BaseButton
        className="edit_btn"
        $Size={{ width: '600px', font: '15px' }}
        onClick={() => router.push('/qna/question')}
      >
        <MdOutlineModeEditOutline />
        {' 글쓰기'}
      </BaseButton>
      <HydrationBoundary state={dehydratedState}>
        <BoardListView
          boardInfos={data?.boardInfos || []}
          idKey={ID_KEY}
          headItem={HEAD_ITEM}
          tableKey={TABLE_KEYS}
          route={ROUTE_TEMPLATE}
        />
        <PageNation />
        <BoardSearch />
      </HydrationBoundary>
    </ListStyle>
  );
}

export default List;

const ListStyle = styled.div`
  ${styleMixin.Column('flex-start')}
  width: 100%;

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
