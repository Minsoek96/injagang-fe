import { create } from 'zustand';

type State = {
  questionIds: number[];
  boardSearch: string;
  boardType: string;
  curPageNum: number;
  totalPage: number;
};

type Action = {
  setQuestionIds: (list: number[]) => void;
  setBoardSearch: (search: string) => void;
  initBoardSearch: () => void;
  setBoardType: (type: string) => void;
  setCurPageNum: (update: (prev: number) => number) => void;
  setTotalPage: (page: number) => void;
};

/** 게시판 조회에 필요한 정보 */
const useBoardStore = create<State & Action>((set) => ({
  questionIds: [],
  boardSearch: '',
  boardType: '',
  curPageNum: 1,
  totalPage: 1,

  setQuestionIds: (list: number[]) => set({ questionIds: list }),
  setBoardSearch: (search: string) => set({ boardSearch: search }),
  setBoardType: (type: string) => set({ boardType: type }),
  initBoardSearch: () => set({ boardSearch: '', boardType: '' }),
  setCurPageNum: (update) =>
    set((state) => ({
      curPageNum: update(state.curPageNum),
    })),
  setTotalPage: (page: number) => set({ totalPage: page }),
}));

export default useBoardStore;
