import { useQuery } from "@tanstack/react-query";

import { getDetailBoard } from "./apis";

import { board } from "./queryKeys";

const useFetchBoardDetail = (id: number) => {
  return useQuery({
    queryKey: board.detail(id),
    queryFn: () => getDetailBoard(id),
  });
};

export {
  useFetchBoardDetail
}