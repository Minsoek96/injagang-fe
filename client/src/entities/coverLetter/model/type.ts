export interface IQnaList {
  question: string;
  answer: string;
}

export interface IReadQnaList extends IQnaList {
  qnaId: number | string;
}

interface ICoverLetterBase {
  title: string;
  owner: boolean;
}

export interface IWriteCoverLetter {
  title: string,
  qnaList: IQnaList[];
}

export interface ICoverLetterDetail extends ICoverLetterBase {
  essayId: number;
  qnaList: IReadQnaList[];
}

export interface ICoverLetters extends ICoverLetterBase {
  essayId: number;
  questions: string[];
}

export interface IReviseCoverLetter {
  title: string;
  qnaList: IQnaList[];
}

export interface ICoverLetter {
  essayId: number;
  title: string;
  owner: boolean;
  qnaList: IReadQnaList[];
}
