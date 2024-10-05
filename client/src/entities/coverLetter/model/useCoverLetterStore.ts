import { create } from 'zustand';
import { coverLetterType } from '@/src/entities/coverLetter';

interface InitiaState {
  selectedCoverLetter: coverLetterType.ICoverLetters;
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
  selectedCoverLetter: coverLetterType.ICoverLetters;
};

type Action = {
  setCoverLetter: (data: coverLetterType.ICoverLetters) => void;
  initCoverLetter: () => void;
};

/** 유저가 선택한 자기소개서 관리 */
const useCoverLetterStore = create<State & Action>((set) => ({
  selectedCoverLetter: initialState.selectedCoverLetter,
  setCoverLetter: (data: coverLetterType.ICoverLetters) =>
    set({
      selectedCoverLetter: data,
    }),
  initCoverLetter: () =>
    set({
      selectedCoverLetter: initialState.selectedCoverLetter,
    }),
}));

export default useCoverLetterStore;
