import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type EditBoardProps = {
  title: string;
  content: string;
};

type State = {
  boardSearch: string;
  boardType: string;
  curPageNum: number;
  editBoardState: EditBoardProps;
};

type Action = {
  setBoardSearch: (search: string) => void;
  initBoardSearch: () => void;
  setBoardType: (type: string) => void;
  setCurPageNum: (update: (prev: number) => number) => void;
  setEditBoardState: (boardState: EditBoardProps) => void;
  initEditBoardState: () => void;
};

const initialState: State = {
  boardSearch: '',
  boardType: '',
  curPageNum: 1,
  editBoardState: {
    title: '',
    content: '',
  },
};

/**
 * boardSearch: 유저가 검색한 내용
 * boardTpye : 유저가 선택한 검색 타입
 * curPageNum : 유저가 현재 선택한 번호
 * editBoardContent : 유저가 수정 요청하는 보드 정보
 */
const useBoardStore = create<State & Action>()(
  persist(
    (set) => ({
      ...initialState,

      setBoardSearch: (search: string) => set({ boardSearch: search }),
      setBoardType: (type: string) => set({ boardType: type }),
      setCurPageNum: (update) =>
        set((state) => ({
          curPageNum: update(state.curPageNum),
        })),
      initBoardSearch: () =>
        set({ boardSearch: '', boardType: '', curPageNum: 1 }),

      setEditBoardState: (boardState: EditBoardProps) =>
        set({
          editBoardState: boardState,
        }),
      initEditBoardState: () =>
        set({ editBoardState: { title: '', content: '' } }),
    }),
    {
      name: 'board-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        editBoardState: state.editBoardState,
        curPageNum: state.curPageNum,
      }),
    },
  ),
);

export default useBoardStore;
