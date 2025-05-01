import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import useBoardStore from '@/src/entities/qnaboard/model/useBoardStore';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { getBoardList, getDetailBoard } from './apis';

import board from './queryKeys';

/** 선택된 페이지 넘버 게시판목록 조회
 *
 * - type 또는 searchSearch가 비어있으면 키값 변화 방지
 */
const useFetchBoardList = () => {
  const curPageNum = useBoardStore((state) => state.curPageNum);
  const boardType = useBoardStore((state) => state.boardType);
  const boardSearch = useBoardStore((state) => state.boardSearch);

  const isAllType = useCallback(
    (type: string) => type === 'all',
    [],
  );

  const queryParams = useMemo(() => {
    // 'all' 타입인 경우 쿼리키 기본값 유지
    if (isAllType(boardType)) {
      return {
        type: '',
        searchTerm: '',
        page: curPageNum,
      };
    }

    const isFiltered = Boolean(boardType && boardSearch);
    const validType = isFiltered ? boardType : '';
    const validSearchTerm = isFiltered ? boardSearch : '';
    return {
      type: validType,
      searchTerm: validSearchTerm,
      page: curPageNum,
    };
  }, [boardType, boardSearch, curPageNum, isAllType]);

  return useQuery({
    queryKey: board.lists(
      queryParams.page,
      queryParams.type,
      queryParams.searchTerm,
    ),
    queryFn: () =>
      getBoardList(queryParams.page, queryParams.type, queryParams.searchTerm),
    placeholderData: (previousData) => previousData,
  });
};

/** 선택된 게시글 상세조회 */
const useFetchBoardDetail = (id: number) =>
  useQuery({
    queryKey: board.detail(id),
    queryFn: () => getDetailBoard(id),
  });

/** 현재 페이지의 게시글 상세조회 */
const useFetchCurrentBoardDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const boardId = Number(id);

  const queryResult = useSuspenseQuery({
    queryKey: board.detail(boardId),
    queryFn: () => {
      if (!boardId) {
        return Promise.resolve(null);
      }
      return getDetailBoard(boardId);
    },
  });

  return {
    ...queryResult,
    boardId,
  };
};
export { useFetchBoardDetail, useFetchBoardList, useFetchCurrentBoardDetail };
