import {
  ICoverLetterDetail,
  ICoverLetters,
  IReviseCoverLetter,
  IWriteCoverLetter,
} from '@/src/entities/coverLetter/type';

const sampleCoverLetters: IWriteCoverLetter = {
  title: '',
  owner: true,
  qnaList: [
    { question: 'testQ', answer: 'testA' },
    { question: 'testQ', answer: 'testA' },
  ],
};

const sampleReviseCoverLetter: { id: number; data: IReviseCoverLetter } = {
  id: 10000,
  data: sampleCoverLetters,
};

const responseCoverLetters: ICoverLetters[] = [
  {
    title: 'test',
    owner: true,
    essayId: 10000,
    questions: ['question1', 'question2', 'question3'],
  },
];

const responseDetailCoverLetter: ICoverLetterDetail = {
  essayId: 10000,
  title: 'test coverLetter',
  owner: true,
  qnaList: [
    { qnaId: 10001, question: 'test1', answer: 'test1' },
    { qnaId: 10001, question: 'test2', answer: 'test2' },
    { qnaId: 10001, question: 'test3', answer: 'test3' },
  ],
};

export {
  sampleCoverLetters, sampleReviseCoverLetter, responseCoverLetters, responseDetailCoverLetter,
};
