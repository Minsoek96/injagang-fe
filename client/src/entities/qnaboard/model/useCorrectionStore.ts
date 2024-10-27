import { feedbackType } from '@/src/entities/feedback';
import { create } from 'zustand';

type State = {
  correction: feedbackType.CorrectionItem;
};

type Action = {
  setCorrection: (item: feedbackType.CorrectionItem) => void;
  initCorrection: () => void;
};

/** 유저가 선택한 첨삭 정보
 * targetAnswer : 유저가 첨삭 텍스트
 * targetQuestion :  유저가 드래그로 생성한 질문
 * targetQuestionindex : 첨삭이 이루어진 질문의 번호
*/

const useCorrectionStore = create<State & Action>((set) => ({
  correction: {
    targetAnswer: '',
    targetQuestionIndex: 0,
  },
  setCorrection: (item: feedbackType.CorrectionItem) =>
    set({ correction: item }),
  initCorrection: () =>
    set({
      correction: {
        targetAnswer: '',
        targetQuestionIndex: 0,
      },
    }),
}));

export default useCorrectionStore;
