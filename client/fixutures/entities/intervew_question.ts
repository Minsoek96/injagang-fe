import {
  IAddQuestions,
  IQuestion,
  IRandomQuestions,
  QuestionType,
} from '@/src/entities/interview_question/model/type';

const sampleRandomQuestion: IRandomQuestions[] = [
  {
    questionType: QuestionType.CS,
    size: 5,
  },
  {
    questionType: QuestionType.FRONT,
    size: 3,
  },
  {
    questionType: QuestionType.BACK,
    size: 3,
  },
  {
    questionType: QuestionType.COMMON,
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

const sampleQuestionPlayList = [
  'testQuestion',
  'testQuestion1',
  'testQuestion2',
  'testQuestion3',
];

const sampleUserPlayList = [
  'userPlayList1',
  'userPlayList2',
  'userPlayList3',
  'userPlayList4',
  'userPlayList5',
];

export {
  sampleRandomQuestion,
  sampleResponseRandomQ,
  sampleAddQuestions,
  sampleType,
  sampleResponseQuestions,
  sampleQuestionPlayList,
  sampleUserPlayList,
};
