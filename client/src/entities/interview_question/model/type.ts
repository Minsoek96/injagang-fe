// eslint-disable-next-line no-shadow
export enum QuestionType {
  CS = 'CS',
  SITUATION = 'SITUATION',
  JOB = 'JOB',
  PERSONALITY = 'PERSONALITY',
  ALL = 'ALL', // ALL이라는 타입은 API 문서상은 존재하지 않는 예외 타입
}

export interface IAddQuestions {
  questions: string[];
  questionType: QuestionType | string;
}

export interface IGetQuestion {
  id: number;
  questions: string[];
}

export interface IRandomQuestions {
  size: number;
  questionType: QuestionType;
}

export interface IDeleteQuestions {
  ids: number[];
}

export interface IResponseRandom {
  id: number;
  questions: QuestionType;
}

export interface IQuestion {
  id: number;
  questions: string;
}

export interface IntvFeedback {
  question: string;
  answer: string;
}
