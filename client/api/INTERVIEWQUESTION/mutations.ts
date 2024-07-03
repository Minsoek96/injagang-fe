import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addInterViewQuestion,
  deleteInterViewQuestion,
  getRandomQuestions,
} from "./apis";
import {
  IAddQuestions,
  IDeleteQuestions,
  IRandomQuestions,
  IResponseRandom,
} from "@/types/InterViewQuestion/InterViewQuestionType";
import { useInterViewStore } from "@/store/interview";
import { ERROR_MESSAGES, SUCCESS_MESSAGES, TOAST_MODE } from "@/constants";
import interview from "./queryKeys";

const useFetchRandomQuestion = () => {
  const [showToast] = useToast();
  const { setConfirmQuestions } = useInterViewStore();

  return useMutation(
    {
    mutationFn: (random: IRandomQuestions[]) =>
      getRandomQuestions(random).then(res => res.data),

    onSuccess: (data: IResponseRandom[]) => {
      const filterQuestion = data.map(item => item.questions);
      setConfirmQuestions(filterQuestion);

      showToast(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.GET_RANDOMQUESTION);
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.GET_RANDOMQUESTION);
    },
  });
};

const useDeleteInterViewQ = () => {
  const [showToast] = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: IDeleteQuestions) => deleteInterViewQuestion(ids),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: interview.all });
      showToast(
        TOAST_MODE.SUCCESS,
        SUCCESS_MESSAGES.DELETED_INTERVIEW_QUESTION,
      );
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.DELETED_INTERVIEW_QUESTION);
    },
  });
};

const useAddInterViewQ = () => {
  const [showToast] = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (list: IAddQuestions) => addInterViewQuestion(list),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: interview.all });

      showToast(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.ADDED_INTERVIEW_QUESTION);
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.ADDED_INTERVIEW_QUESTION);
    },
  });
};

export { useFetchRandomQuestion, useDeleteInterViewQ, useAddInterViewQ };
