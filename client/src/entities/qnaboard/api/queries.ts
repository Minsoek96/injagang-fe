import { useQuery } from '@tanstack/react-query';

import useBoardStore from '@/src/entities/qnaboard/model/useBoardStore';
import { useShallow } from 'zustand/react/shallow';
import { useRouter } from 'next/router';
import { getBoardList, getDetailBoard } from './apis';

import board from './queryKeys';

/** 선택된 페이지 넘버 게시판목록 조회 */
const useFetchBoardList = () => {
  const {
    curPageNum, boardType, boardSearch,
  } = useBoardStore(useShallow((state) => ({
    curPageNum: state.curPageNum,
    boardType: state.boardType,
    boardSearch: state.boardSearch,
  })));

  return useQuery({
    queryKey: board.lists(curPageNum, boardType, boardSearch),
    queryFn: () => getBoardList(curPageNum, boardType, boardSearch),
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

  return useQuery({
    queryKey: board.detail(Number(id)),
    queryFn: () => getDetailBoard(Number(id)),
    enabled: !!id,
  });
};
export { useFetchBoardDetail, useFetchBoardList, useFetchCurrentBoardDetail };
