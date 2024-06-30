import { IGetEssayList } from "@/types/essay/EssayType";
import { create } from "zustand";

interface InitiaState {
  selectedEssayList: IGetEssayList;
}

const initialState: InitiaState = {
  selectedEssayList: {
    essayId: 0,
    title: "",
    owner: false,
    questions: [],
  },
};

type State = {
  selectedCoverLetter: IGetEssayList;
};

type Action = {
  setCoverLetter: (data: IGetEssayList) => void;
  initCoverLetter: () => void;
};

const useCoverLetterStore = create<State & Action>(set => ({
  selectedCoverLetter: initialState.selectedEssayList,
  setCoverLetter: (data: IGetEssayList) =>
    set({
      selectedCoverLetter: data,
    }),
  initCoverLetter: () =>
    set({
      selectedCoverLetter: initialState.selectedEssayList,
    }),
}));

export default useCoverLetterStore;
