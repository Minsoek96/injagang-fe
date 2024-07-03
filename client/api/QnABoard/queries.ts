import { useQuery } from "@tanstack/react-query";

import { getBoardList, getDetailBoard } from "./apis";

import { board } from "./queryKeys";

const useFetchBoardList = (page: number, type: string, content: string) => {
  return useQuery({
    queryKey: board.lists(page, type, content),
    queryFn: () => getBoardList(page, type, content),
  });
};

const useFetchBoardDetail = (id: number) => {
  return useQuery({
    queryKey: board.detail(id),
    queryFn: () => getDetailBoard(id),
  });
};

export { useFetchBoardDetail, useFetchBoardList };
