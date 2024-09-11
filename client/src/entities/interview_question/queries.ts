import { useQuery } from '@tanstack/react-query';
import { QuestionType } from '@/src/entities/interview_question/type';
import interview from './queryKeys';
import { getInterViewQuestionList } from './apis';

/** 선택된 면접 질문 리스트 조회 */
const useFetchQuestions = (type: QuestionType | string) =>
  useQuery({
    queryKey: interview.list(type),
    queryFn: () => getInterViewQuestionList(type),
    enabled: Object.values(QuestionType).includes(type as QuestionType),
    staleTime: 24 * 60 * 60 * 1000,

  });

export { useFetchQuestions };
