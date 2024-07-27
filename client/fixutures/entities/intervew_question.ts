import {
  IAddQuestions,
  IQuestion,
  IRandomQuestions,
  QuestionType,
} from '@/src/entities/interview_question/type';

const sampleRandomQuestion: IRandomQuestions[] = [
  {
    questionType: QuestionType.CS,
    size: 5,
  },
  {
    questionType: QuestionType.SITUATION,
    size: 3,
  },
  {
    questionType: QuestionType.JOB,
    size: 3,
  },
  {
    questionType: QuestionType.PERSONALITY,
    size: 1,
  },
];

const questionList = Array.from({ length: 5 }, (_, i) => i + 1).map((i) => ({
  id: 10000 + i,
  questions: `5${i}`,
}));

const sampleResponseRandomQ: IQuestion[] = questionList;
const sampleResponseQuestions: IQuestion[] = questionList;

const sampleAddQuestions: IAddQuestions = {
  questions: ['test', 'test1', 'test2', 'test3', 'test4'],
  questionType: 'CS',
};

const sampleType = QuestionType.CS;

export {
  sampleRandomQuestion,
  sampleResponseRandomQ,
  sampleAddQuestions,
  sampleType,
  sampleResponseQuestions,
};
