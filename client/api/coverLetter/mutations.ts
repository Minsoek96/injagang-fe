import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCoverLetter, deleteCoverLetter, reviseCoverLetter } from "./apis";
import { IReviseEssayList, IWriteEssayList } from "@/types/essay/EssayType";
import coverLetter from "./querykeys";
import { ERROR_MESSAGES, SUCCESS_MESSAGES, TOAST_MODE } from "@/constants";

const useWriteCoverLetter = () => {
  const [showToast] = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IWriteEssayList) => addCoverLetter(data),

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
  const [showToast] = useToast();
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
  const [showToast] = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: IReviseEssayList }) =>
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

export {
    useWriteCoverLetter,
    useDeleteCoverLetter,
    useReviseCoverLetter
}