import { CorrectionItem } from "@/components/QNA/Answer/AnswerLayout";
import { create } from "zustand";

type State = {
  correction: CorrectionItem;
};

type Action = {
  setCorrection: (item: CorrectionItem) => void;
  initCorrection: () => void;
};

const useCorrectionStore = create<State & Action>(set => ({
  correction: {
    targetAnswer: "",
    targetQuestion: 0,
    targetQuestionIndex: 0,
  },
  setCorrection: (item: CorrectionItem) => set({ correction: item }),
  initCorrection: () =>
    set({
      correction: {
        targetAnswer: "",
        targetQuestion: 0,
        targetQuestionIndex: 0,
      },
    }),
}));

export default useCorrectionStore;