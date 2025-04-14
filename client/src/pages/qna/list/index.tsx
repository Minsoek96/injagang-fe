import { useEffect, useMemo } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';

import styled from 'styled-components';
import { MdOutlineModeEditOutline } from 'react-icons/md';

import { boardQueries, useBoardStore } from '@/src/entities/qnaboard';

import { MainButton } from '@/src/shared/ui/button';
import { styleMixin, V } from '@/src/shared/styles';

import { Container } from '@/src/shared/ui';
import {
  HEAD_ITEM,
  ID_KEY,
  ROUTE_TEMPLATE,
  TABLE_KEYS,
} from './const';

const BoardListView = dynamic(
  () => import('@/src/widgets/board/ui/list-layout/BoardListLayout'),
  { ssr: false },
);

const PageNavigator = dynamic(
  () => import('@/src/features/qna/pagination/PageNavigator'),
  {
    ssr: false,
  },
);

const BoardSearch = dynamic(
  () => import('@/src/features/qna/search/BoardSearch'),
  {
    ssr: false,
  },
);

type ListProps = {
  dehydratedState: DehydratedState;
};

function List({ dehydratedState }: ListProps) {
  const router = useRouter();
  const { data: boardList } = boardQueries.useFetchBoardList();
  const initBoardSearch = useBoardStore((state) => state.initBoardSearch);
  const totalPage = useMemo(() => boardList?.totalPage, [boardList]);

  useEffect(
    () => () => {
      initBoardSearch();
    },
    [],
  );

  return (
    <ListStyle>
      <HydrationBoundary state={dehydratedState}>
        <BoardHeader>
          <BoardSearch />
          <MainButton
            label={(
              <span>
                <MdOutlineModeEditOutline />
                글쓰기
              </span>
            )}
            onClick={() => router.push('/qna/question')}
            sx={{
              fontSize: '1.5rem',
              padding: '1rem 2rem',
              height: '100%',
            }}
          />
        </BoardHeader>
        <BoardListView
          boardInfos={boardList?.boardInfos || []}
          idKey={ID_KEY}
          headItem={HEAD_ITEM}
          tableKey={TABLE_KEYS}
          route={ROUTE_TEMPLATE}
        />
        <PageNavigator pageLimit={8} totalPage={totalPage ?? 0} />
      </HydrationBoundary>
    </ListStyle>
  );
}

export default List;

const ListStyle = styled.div`
  ${styleMixin.Column('flex-start', 'center')}
  width: 100%;
`;

const BoardHeader = styled(Container.ItemBase)`
  ${styleMixin.Flex('flex-end')}
  max-width: 100%;
  height: 4rem;

  @media screen and (max-width: ${V.mediaMobile}) {
    button {
      font-size: 1.3rem !important;
      width: 10rem;

      svg {
        display: none;
      }
    }
  }
`;
