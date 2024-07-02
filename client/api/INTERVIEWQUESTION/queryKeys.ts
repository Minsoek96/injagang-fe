import { QuestionType } from "@/types/InterViewQuestion/InterViewQuestionType";

const interview = {
  all: ["interview"],
  list: (type: QuestionType | string) => [...interview.all, type],
};

export default interview;
