import { memo, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';

import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';

import styled from 'styled-components';

import { boardQueries, useBoardStore } from '@/src/entities/qnaboard';

import { styleMixin, V } from '@/src/shared/styles';
import { Container, Spinner } from '@/src/shared/ui';

import { useRouter } from 'next/router';
import { CreateQuestionButton } from './ui';
import {
  HEAD_ITEM,
  ID_KEY,
  ROUTE_TEMPLATE,
  TABLE_KEYS,
} from './const';

const BoardListView = dynamic(
  () => import('@/src/widgets/board/ui/list-layout/BoardListLayout'),
);

const PageNavigator = dynamic(
  () => import('@/src/features/qna/pagination/PageNavigator'),
);

const BoardSearchBar = dynamic(
  () => import('@/src/features/qna/search/ui/BoardSearchBar'),
  {
    ssr: false,
  },
);

const MemoizedBoardListView = memo(BoardListView);
const MemoizedPageNavigator = memo(PageNavigator);

type ListProps = {
  dehydratedState: DehydratedState;
};

function List({ dehydratedState }: ListProps) {
  const router = useRouter();
  const { data: boardList, isLoading } = boardQueries.useFetchBoardList();
  const initBoardSearch = useBoardStore((state) => state.initBoardSearch);
  const totalPage = useMemo(() => boardList?.totalPage, [boardList]);

  useEffect(
    () => {
      const handleRouteChangeStart = (url: string) => {
        const currentPath = router.asPath;
        if (url !== currentPath) {
          initBoardSearch();
        }
      };
      router.events.on('routeChangeStart', handleRouteChangeStart);
      return () => {
        router.events.off('routeChangeStart', handleRouteChangeStart);
      };
    },
    [],
  );

  if (!boardList && isLoading) {
    return <Spinner message="게시글을 불러오는 중입니다." />;
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      <ListContainer>
        <BoardHeader>
          <BoardSearchBar />
          <CreateQuestionButton />
        </BoardHeader>
        <MemoizedBoardListView
          boardInfos={boardList?.boardInfos || []}
          idKey={ID_KEY}
          headItem={HEAD_ITEM}
          tableKey={TABLE_KEYS}
          route={ROUTE_TEMPLATE}
        />
        <MemoizedPageNavigator pageLimit={8} totalPage={totalPage ?? 0} />
      </ListContainer>
    </HydrationBoundary>
  );
}

export default List;

const ListContainer = styled.div`
  ${styleMixin.Column('flex-start', 'center')}
  width: 100%;
`;

const BoardHeader = styled(Container.ItemBase)`
  ${styleMixin.Flex('flex-end')}
  max-width: 100%;
  height: 4rem;

  @media screen and (max-width: ${V.mediaMobile}) {
    button {
      width: 10rem;

      svg {
        display: none;
      }
    }
  }
`;
