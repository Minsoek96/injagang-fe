// eslint-disable-next-line no-shadow
export enum QuestionType {
  CS = 'CS',
  SITUATION = 'SITUATION',
  JOB = 'JOB',
  PERSONALITY = 'PERSONALITY',
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
