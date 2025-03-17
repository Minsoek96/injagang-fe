import { useQuery } from '@tanstack/react-query';

import { QuestionType } from '@/src/entities/interview_question/model/type';

import useIntvPlaylistStore from '@/src/entities/interview_question/model/useIntvPlaylistStore';
import interview from './queryKeys';
import { getInterViewQuestionList } from './apis';

/** 선택된 면접 질문 리스트 조회 */
const useFetchQuestions = () => {
  const { selectedType } = useIntvPlaylistStore();
  return useQuery({
    queryKey: interview.list(selectedType),
    queryFn: () => getInterViewQuestionList(selectedType),
    enabled: Object.values(QuestionType).includes(selectedType as QuestionType),
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export { useFetchQuestions };
