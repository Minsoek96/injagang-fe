import { create } from 'zustand';

type State = {
  confirmQuestions: string[];
  selectedType: string;
  userPlayList: string[];
};

type Action = {
  setConfirmQuestions: (list: string[]) => void;
  setSelectedType: (type: string) => void;
  setUserPlayList: (list: string[]) => void;
  initUserPlayList: () => void;
};

const useInterViewStore = create<State & Action>((set) => ({
  userPlayList: [],
  confirmQuestions: [],
  selectedType: '',

  setConfirmQuestions: (lists: string[]) => {
    set((state) => ({
      confirmQuestions: [...state.confirmQuestions, ...lists],
    }));
  },
  setUserPlayList: (list: string[]) =>
    set({
      userPlayList: list,
    }),
  setSelectedType: (type: string) => set({ selectedType: type }),

  initUserPlayList: () => set({ userPlayList: [] }),
}));

export default useInterViewStore;
