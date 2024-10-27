import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IReviseQnaBoard, IWriteQnaBoard } from '@/src/entities/qnaboard/model/type';

import { useToast } from '@/src/shared/hooks';
import { ERROR_MESSAGES, SUCCESS_MESSAGES, TOAST_MODE } from '@/src/shared/const';

import board from './queryKeys';
import { deleteQnaBoard, reviseQnaBoard, writeQnaBoard } from './apis';

/** 게시판글 삭제 */
const useDeleteBoard = () => {
  const { showToast } = useToast();
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

/** 게시판글 수정 */
const useReviseBoard = () => {
  const { showToast } = useToast();
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

/** 게시판 글 작성 */
const useWriteBoard = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newBoard: IWriteQnaBoard) => writeQnaBoard(newBoard),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: board.all });

      showToast(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.ADDED_QUESTION);
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.ADDED_QUESTION);
    },
  });
};

export { useWriteBoard, useReviseBoard, useDeleteBoard };
