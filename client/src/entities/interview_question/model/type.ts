// eslint-disable-next-line no-shadow
export const QuestionType = {
  CS: 'CS',
  FRONT: 'FRONT',
  BACK: 'BACK',
  COMMON: 'COMMON',
  UNIVERSITY: 'UNIVERSITY',
  SITUATION: 'SITUATION',
  ALL: 'ALL',
} as const;

/** 서버 타입 유형 */
export type QuestionTypeValue = typeof QuestionType[keyof typeof QuestionType];

/** 클라이언트 타입 유형 */
export type QuestionTypeKrValue = 'CS 질문' | '상황 질문' | '프론트엔드 질문' | '백엔드 질문' | '공통 질문' | '대학 입학 질문' | '전체 유형';

export const QuestionTypeKr: Record<QuestionTypeValue, QuestionTypeKrValue> = {
  [QuestionType.CS]: 'CS 질문',
  [QuestionType.SITUATION]: '상황 질문',
  [QuestionType.FRONT]: '프론트엔드 질문',
  [QuestionType.BACK]: '백엔드 질문',
  [QuestionType.COMMON]: '공통 질문',
  [QuestionType.UNIVERSITY]: '대학 입학 질문',
  [QuestionType.ALL]: '전체 유형',
} as const;

export interface IAddQuestions {
  questions: string[];
  questionType: QuestionTypeValue | string;
}

export interface IGetQuestion {
  id: number;
  questions: string[];
}

export interface IRandomQuestions {
  size: number;
  questionType: QuestionTypeValue;
}

export interface IDeleteQuestions {
  ids: number[];
}

export interface IResponseRandom {
  id: number;
  questions: QuestionTypeValue;
}

export interface IQuestion {
  id: number;
  questions: string;
}

export interface IntvFeedback {
  question: string;
  answer: string;
}

export type RecordContent = {
  script: string;
  timer: string;
  voiceScript: string;
  strengths?: string[] | null;
  improvements?: string[] | null;
  rating?: string | null;
};
