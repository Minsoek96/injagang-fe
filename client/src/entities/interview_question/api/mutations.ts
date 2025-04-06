import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  IAddQuestions,
  IDeleteQuestions,
  IntvFeedback,
  IRandomQuestions,
  IResponseRandom,
} from '@/src/entities/interview_question/model/type';

import useIntvPlaylistStore from '@/src/entities/interview_question/model/useIntvPlaylistStore';

import { useToast } from '@/src/shared/hooks';
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  TOAST_MODE,
} from '@/src/shared/const';

import useIntvContentStore from '@/src/entities/interview_question/model/useIntvContentStore';
import {
  addInterViewQuestion,
  deleteInterViewQuestion,
  getIntvFeedback,
  getRandomQuestions,
} from './apis';
import interview from './queryKeys';

/** 랜덤 면접 질문리스트 요청 */
const useFetchRandomQuestion = () => {
  const { showToast } = useToast();
  const setUserPlayList = useIntvPlaylistStore((state) => state.setUserPlayList);

  return useMutation({
    mutationFn: (random: IRandomQuestions[]) =>
      getRandomQuestions(random).then((res) => res.data),

    onSuccess: (data: IResponseRandom[]) => {
      const filterQuestion = data.map((item) => item.questions);
      setUserPlayList(filterQuestion);

      showToast(
        TOAST_MODE.SUCCESS,
        SUCCESS_MESSAGES.GET_RANDOMQUESTION(filterQuestion.length),
      );
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.GET_RANDOMQUESTION);
    },
  });
};

/** 면접 질문 리스트 삭제 */
const useDeleteInterViewQ = () => {
  const { showToast } = useToast();
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

/** 면접 질문 리스트 추가 */
const useAddInterViewQ = () => {
  const { showToast } = useToast();
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

/** 면접 질문 피드백 요청 */
const useGetIntvFeedback = () => {
  const { showToast } = useToast();
  const updateRecordContent = useIntvContentStore((state) => state.updateRecordContent);

  return useMutation({
    mutationFn: (list: IntvFeedback & { counter: number}) => getIntvFeedback(list),

    onSuccess: (
      data: { strengths: string[]; improvements: string[], rating: string },
      variables,
    ) => {
      showToast(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.ADDED_INTERVIEW_QUESTION);
      updateRecordContent(variables.counter, data);
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.ADDED_INTERVIEW_QUESTION);
    },
  });
};

export {
  useFetchRandomQuestion,
  useDeleteInterViewQ,
  useAddInterViewQ,
  useGetIntvFeedback,
};
