import { useQuery } from '@tanstack/react-query';

import {
  QuestionType,
  QuestionTypeKrValue,
  QuestionTypeValue,
} from '@/src/entities/interview_question/model/type';

import useIntvPlaylistStore from '@/src/entities/interview_question/model/useIntvPlaylistStore';
import { useMemo } from 'react';
import interview from './queryKeys';
import { getInterViewQuestionList } from './apis';
import { getQuestionTypeByLabel } from '../util';

/** 선택된 면접 질문 리스트 조회 */
const useFetchQuestions = () => {
  const selectedType = useIntvPlaylistStore((state) => state.selectedType);
  const questionType = useMemo(
    () =>
      getQuestionTypeByLabel(selectedType as QuestionTypeKrValue)
    , [selectedType],
  );

  return useQuery({
    queryKey: interview.list(questionType),
    queryFn: () => getInterViewQuestionList(selectedType),
    enabled: Object.values(QuestionType).includes(
      selectedType as QuestionTypeValue,
    ),
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export { useFetchQuestions };
