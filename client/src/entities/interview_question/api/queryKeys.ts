import { QuestionTypeValue } from '@/src/entities/interview_question/model/type';

const interview = {
  all: ['interview'],
  list: (type: QuestionTypeValue | string) => [...interview.all, type],
};

export default interview;
