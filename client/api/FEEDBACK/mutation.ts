import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviseFeedBack, writeFeedBack } from "./apis";
import { IReviseFeedBack, IWriteFeedBack } from "@/types/feedback/FeedBackType";
import useToast from "@/hooks/useToast";
import { feedback } from "./queryKeys";
import { ERROR_MESSAGES, SUCCESS_MESSAGES, TOAST_MODE } from "@/constants";

const useReviseFeed = (targetId: number) => {
  const [showToast] = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (feedback: IReviseFeedBack) => reviseFeedBack(feedback),

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
  const [showToast] = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (feedback: IWriteFeedBack) => writeFeedBack(feedback),

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
