import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ERROR_MESSAGES, SUCCESS_MESSAGES, TOAST_MODE } from '@/src/shared/const';

import { useToast } from '@/src/shared/hooks';
import {
  IReviseCoverLetter,
  IWriteCoverLetter,
} from '@/src/entities/coverLetter/type';

import { addCoverLetter, deleteCoverLetter, reviseCoverLetter } from './apis';

import coverLetter from './querykeys';

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
