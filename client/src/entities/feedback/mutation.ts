import { useMutation, useQueryClient } from '@tanstack/react-query';

import useToast from '@/hooks/useToast';

import { ERROR_MESSAGES, SUCCESS_MESSAGES, TOAST_MODE } from '@/src/shared/const';
import { IReviseFeedBack, IWriteFeedBack } from '@/src/entities/feedback/type';

import feedback from './queryKeys';

import { reviseFeedBack, writeFeedBack } from './apis';

const useReviseFeed = (targetId: number) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (feed: IReviseFeedBack) => reviseFeedBack(feed),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedback.list(targetId) });

      showToast(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.UPDATED_FEED);
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.UPDATED_FEED);
    },
  });
};

const useWriteFeed = (targetId: number) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (feed: IWriteFeedBack) => writeFeedBack(feed),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedback.list(targetId) });

      showToast(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.ADDED_FEED);
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.ADDED_FEED);
    },
  });
};

export { useWriteFeed, useReviseFeed };
