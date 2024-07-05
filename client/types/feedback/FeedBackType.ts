export interface IWriteFeedBack {
  qnaId: number;
  feedbackTarget: string;
  feedbackContent: string;
}

export interface IReviseFeedBack {
  feedbackId: number;
  reviseContent: string;
}

export interface IGetFeedBack {
  feedbackId: number;
  target: string;
  content: string;
  owner: boolean;
}

export type CorrectionItem = {
  targetQuestion: number;
  targetAnswer: string;
  targetQuestionIndex: number;
};
