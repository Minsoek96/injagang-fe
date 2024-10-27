import { feedbackType } from '@/src/entities/feedback';
import {
  IBoardList, IGetQnaBoardList, IReviseQnaBoard, IWriteQnaBoard,
  SelectedText,
} from '@/src/entities/qnaboard/model/type';

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
  targetQuestionIndex: 10001,
};

const sampleSelectedText: SelectedText = {
  targetId: 10001,
  selectedText: 'answer',
  start: 5,
  end: 11,
  added: false,
};

const emptySelectedText: SelectedText = {
  targetId: 0,
  selectedText: '',
  start: 0,
  end: 0,
  added: false,
};

export {
  sampleReviseQnaBoard,
  sampleWriteQnaBoard,
  sampleBoardList,
  sampleDetailBoard,
  sampleQuestionIds,
  sampleCorrection,
  sampleSelectedText,
  emptySelectedText,
};
