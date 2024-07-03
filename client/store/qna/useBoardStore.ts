import { create } from "zustand";

type State = {
  questionList: number[];
  boardSearch: string;
  boardType: string;
  curPageNum: number;
  totalPage: number;
};

type Action = {
  setQuestions: (list: number[]) => void;
  setBoardSearch: (search: string) => void;
  initBoardSearch: () => void;
  setBoardType: (type: string) => void;
  setCurPageNum: (update: (prev: number) => number) => void;
  setTotalPage: (page: number) => void;
};

const useBoardStore = create<State & Action>(set => ({
  questionList: [],
  boardSearch: "",
  boardType: "",
  curPageNum: 1,
  totalPage: 1,

  setQuestions: (list: number[]) => set({ questionList: list }),
  setBoardSearch: (search: string) => set({ boardSearch: search }),
  setBoardType: (type: string) => set({ boardType: type }),
  initBoardSearch: () => set({ boardSearch: "", boardType: "" }),
  setCurPageNum: update =>
    set(state => ({
      curPageNum: update(state.curPageNum),
    })),
  setTotalPage: (page: number) => set({ totalPage: page }),
}));

export default useBoardStore;
