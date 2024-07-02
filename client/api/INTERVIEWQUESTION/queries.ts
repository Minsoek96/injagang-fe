import { useQuery } from "@tanstack/react-query";
import interview from "./queryKeys";
import { QuestionType } from "@/types/InterViewQuestion/InterViewQuestionType";
import { getInterViewQuestionList } from "./apis";

const useFetchQuestions = (type: QuestionType | string) => {
  return useQuery({
    queryKey: interview.list(type),
    queryFn: () => getInterViewQuestionList(type),
  });
};

export { useFetchQuestions };
