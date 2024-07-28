import { feedbackType } from '@/src/entities/feedback';
import {
  IBoardList, IGetQnaBoardList, IReviseQnaBoard, IWriteQnaBoard,
} from '@/src/entities/qnaboard/type';

const sampleReviseQnaBoard:IReviseQnaBoard = {
  boardId: 10001,
  changeTitle: 'testTitle',
  changeContent: 'testContent',
};

const sampleWriteQnaBoard: IWriteQnaBoard = {
  title: 'newTestBoard',
  content: 'TestContent',
  essayId: 10001,
};

const boardList:IBoardList[] = Array.from({ length: 15 }, (_, i) => i + 1).map((i) => (
  {
    id: 10000 + i, title: `TestTitle${1}`, nickname: `Tester${10000 + i}`,
  }
));

const sampleBoardList: IGetQnaBoardList = {
  totalPage: 10, boardInfos: boardList, isFirst: false, isLast: false,
};

const sampleDetailBoard:IBoardList = {
  id: 10001, title: 'TestTitle', nickname: 'Tester',
};

const sampleQuestionIds = [10001, 10002, 10003, 10004, 10005];

const sampleCorrection:feedbackType.CorrectionItem = {
  targetAnswer: 'testAnswer',
  targetQuestion: 1,
  targetQuestionIndex: 10001,
};

export {
  sampleReviseQnaBoard,
  sampleWriteQnaBoard,
  sampleBoardList,
  sampleDetailBoard,
  sampleQuestionIds,
  sampleCorrection,
};
