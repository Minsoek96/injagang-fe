import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQnaBoard, reviseQnaBoard, writeQnaBoard } from "./apis";
import { board } from "./queryKeys";
import { IReviseQnaBoard, IWriteQnaBoard } from "@/types/qnaBoard/QnaBoardType";

const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteQnaBoard(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: board.all }),
  });
};

const useReviseBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (boardPayload: IReviseQnaBoard) => reviseQnaBoard(boardPayload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: board.all }),
  });
};

const useWriteBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newBoard: IWriteQnaBoard) => writeQnaBoard(newBoard),
    onMutate: () => queryClient.invalidateQueries({ queryKey: board.lists() }),
  });
};

export {
    useWriteBoard, 
    useReviseBoard, 
    useDeleteBoard 
};
