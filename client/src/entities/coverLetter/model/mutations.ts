import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  IReviseCoverLetter,
  IWriteCoverLetter,
} from '@/src/entities/coverLetter/lib/type';
import coverLetter from '@/src/entities/coverLetter/lib/querykeys';

import { ERROR_MESSAGES, SUCCESS_MESSAGES, TOAST_MODE } from '@/src/shared/const';
import { useToast } from '@/src/shared/hooks';
import { addCoverLetter, deleteCoverLetter, reviseCoverLetter } from '@/src/entities/coverLetter/api/apis';

/** 자기소개서 작성 */
const useWriteCoverLetter = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IWriteCoverLetter) => addCoverLetter(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coverLetter.all });
      showToast(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.ADDED_ESSAY);
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.ADDED_ESSAY);
    },
  });
};

/** 자기소개서 삭제하기 */
const useDeleteCoverLetter = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteCoverLetter(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coverLetter.all });
      showToast(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.DELETED_ESSAY);
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.DELETED_ESSAY);
    },
  });
};

/** 자기소개서 수정 */
const useReviseCoverLetter = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: IReviseCoverLetter }) =>
      reviseCoverLetter(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coverLetter.all });
      showToast(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.UPDATED_ESSAY);
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.UPDATED_ESSAY);
    },
  });
};

export { useWriteCoverLetter, useDeleteCoverLetter, useReviseCoverLetter };
