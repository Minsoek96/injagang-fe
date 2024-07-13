import { QuestionType } from '@/src/entities/interview_question/type';

const interview = {
  all: ['interview'],
  list: (type: QuestionType | string) => [...interview.all, type],
};

export default interview;
