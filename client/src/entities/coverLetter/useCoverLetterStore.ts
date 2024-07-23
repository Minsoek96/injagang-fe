import { create } from 'zustand';
import { ICoverLetters } from '@/src/entities/coverLetter/type';

interface InitiaState {
  selectedCoverLetter: ICoverLetters;
}

const initialState: InitiaState = {
  selectedCoverLetter: {
    essayId: 0,
    title: '',
    owner: false,
    questions: [],
  },
};

type State = {
  selectedCoverLetter: ICoverLetters;
};

type Action = {
  setCoverLetter: (data: ICoverLetters) => void;
  initCoverLetter: () => void;
};

const useCoverLetterStore = create<State & Action>((set) => ({
  selectedCoverLetter: initialState.selectedCoverLetter,
  setCoverLetter: (data: ICoverLetters) =>
    set({
      selectedCoverLetter: data,
    }),
  initCoverLetter: () =>
    set({
      selectedCoverLetter: initialState.selectedCoverLetter,
    }),
}));

export default useCoverLetterStore;
