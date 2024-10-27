import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  IReviseFeedBack,
  IWriteFeedBack,
} from '@/src/entities/feedback/model/type';

import { useToast } from '@/src/shared/hooks';
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  TOAST_MODE,
} from '@/src/shared/const';

import useFeedStore from '@/src/entities/feedback/model/useFeedStore';
import feedback from './queryKeys';

import { deleteFeedBack, reviseFeedBack, writeFeedBack } from './apis';

/** 댓글 수정 */
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

/** 댓글 작성 */
const useWriteFeed = () => {
  const { showToast } = useToast();
  const { targetFeed } = useFeedStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (feed: IWriteFeedBack) => writeFeedBack(feed),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedback.list(targetFeed) });

      showToast(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.ADDED_FEED);
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.ADDED_FEED);
    },
  });
};

/** 댓글 삭제 */
const useDeleteFeed = (targetId: number) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (feedId: number) => deleteFeedBack(feedId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedback.list(targetId) });
      showToast(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.DELETE_FEED);
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.DELETE_FEED);
    },
  });
};

export { useWriteFeed, useReviseFeed, useDeleteFeed };
