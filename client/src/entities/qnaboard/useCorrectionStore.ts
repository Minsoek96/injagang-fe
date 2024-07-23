import { feedbackType } from '@/src/entities/feedback';
import { create } from 'zustand';

type State = {
  correction: feedbackType.CorrectionItem;
};

type Action = {
  setCorrection: (item: feedbackType.CorrectionItem) => void;
  initCorrection: () => void;
};

const useCorrectionStore = create<State & Action>((set) => ({
  correction: {
    targetAnswer: '',
    targetQuestion: 0,
    targetQuestionIndex: 0,
  },
  setCorrection: (item: feedbackType.CorrectionItem) =>
    set({ correction: item }),
  initCorrection: () =>
    set({
      correction: {
        targetAnswer: '',
        targetQuestion: 0,
        targetQuestionIndex: 0,
      },
    }),
}));

export default useCorrectionStore;
