import { useQuery } from '@tanstack/react-query';

import { getBoardList, getDetailBoard } from './apis';

import board from './queryKeys';

/** 선택된 페이지 넘버 게시판목록 조회 */
const useFetchBoardList = (page: number, type: string, content: string) =>
  useQuery({
    queryKey: board.lists(page, type, content),
    queryFn: () => getBoardList(page, type, content),
  });

/** 선택된 게시글 상세조회 */
const useFetchBoardDetail = (id: number) =>
  useQuery({
    queryKey: board.detail(id),
    queryFn: () => getDetailBoard(id),
  });

export { useFetchBoardDetail, useFetchBoardList };
