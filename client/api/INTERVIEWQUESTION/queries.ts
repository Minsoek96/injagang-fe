import { useQuery } from '@tanstack/react-query';
import { QuestionType } from '@/types/InterViewQuestion/InterViewQuestionType';
import interview from './queryKeys';
import { getInterViewQuestionList } from './apis';

const useFetchQuestions = (type: QuestionType | string) =>
  useQuery({
    queryKey: interview.list(type),
    queryFn: () => getInterViewQuestionList(type),
  });

export { useFetchQuestions };
