import { useEffect } from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import { BaseButton } from '@/src/shared/components/button';
import { styleMixin } from '@/src/shared/styles';
import { MdOutlineModeEditOutline } from 'react-icons/md';

import {
  DehydratedState,
  HydrationBoundary,
} from '@tanstack/react-query';

import { useBoardStore } from '@/src/entities/qnaboard';
import dynamic from 'next/dynamic';

const BoardListView = dynamic(
  () => import('@/src/features/board/BoardListLayout'),
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
  const { initBoardSearch } = useBoardStore();
  useEffect(
    () => () => {
      initBoardSearch();
    },
    [],
  );

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
        <BoardListView />
        <PageNation />
        <BoardSearch />
      </HydrationBoundary>
    </ListStyle>
  );
}

export default List;

const ListStyle = styled.div`
    ${styleMixin.Column()}
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
