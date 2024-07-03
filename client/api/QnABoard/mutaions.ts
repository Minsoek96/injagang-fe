import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQnaBoard, reviseQnaBoard, writeQnaBoard } from "./apis";
import { board } from "./queryKeys";
import { IReviseQnaBoard, IWriteQnaBoard } from "@/types/qnaBoard/QnaBoardType";
import useToast from "@/hooks/useToast";
import { ERROR_MESSAGES, SUCCESS_MESSAGES, TOAST_MODE } from "@/constants";

const useDeleteBoard = () => {
  const [showToast] = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteQnaBoard(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: board.all });

      showToast(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.DELETED_QUESTION);
    },
    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.DELETED_QUESTION);
    },
  });
};

const useReviseBoard = () => {
  const [showToast] = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardPayload: IReviseQnaBoard) => reviseQnaBoard(boardPayload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: board.all });

      showToast(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.UPDATED_QUESTION);
    },
    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.UPDATED_QUESTION);
    },
  });
};

const useWriteBoard = () => {
  const [showToast] = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newBoard: IWriteQnaBoard) => writeQnaBoard(newBoard),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: board.all})
      
      showToast(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.ADDED_QUESTION);
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.ADDED_QUESTION);
    },
  });
};

export { useWriteBoard, useReviseBoard, useDeleteBoard };
