export interface IBoardList {
  id: number;
  title: string;
  nickname: string;
}

export interface IGetQnaBoardList {
  totalPage: number;
  boardInfos: IBoardList[];
  isFirst: boolean;
  isLast: boolean;
}

export interface IWriteQnaBoard {
  title: string;
  content: string;
  essayId: number;
}

export interface IQnaList {
  question: string;
  answer: string;
  qnaId: number;
}

export interface IGetDetailQnaBoard {
  boardId: number;
  title: string;
  content: string;
  userId: number;
  nickname: string;
  owner: boolean;
  essayTitle: string;
  qnaList: IQnaList[];
}

export interface IReviseQnaBoard {
  boardId: number;
  changeTitle: string;
  changeContent: string;
}

export interface IDeleteQnaBoard {
  boardId: number;
}

export type SelectedText = {
  dragTitleId: number;
  targetId: number;
  selectedText: string;
  start: number;
  end: number;
  added: boolean;
}
