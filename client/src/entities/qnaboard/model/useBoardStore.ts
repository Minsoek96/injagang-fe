import { create } from 'zustand';

type EditBoardProps = {
  title: string;
  content: string;
};

type State = {
  boardSearch: string;
  boardType: string;
  curPageNum: number;
  totalPage: number;
  editBoardState: EditBoardProps;
};

type Action = {
  setBoardSearch: (search: string) => void;
  initBoardSearch: () => void;
  setBoardType: (type: string) => void;
  setCurPageNum: (update: (prev: number) => number) => void;
  setTotalPage: (page: number) => void;
  setEditBoardState: (boardState: EditBoardProps) => void;
  initEditBoardState: () => void;
};

const initialState: State = {
  boardSearch: '',
  boardType: '',
  curPageNum: 1,
  totalPage: 1,
  editBoardState: {
    title: '',
    content: '',
  },
};

/**
 * qnaIdList : 액션이 발생한 번호의 원본아이디를 대입하기 위한 역할
 * boardSearch: 유저가 검색한 내용
 * boardTpye : 유저가 선택한 검색 타입
 * curPageNum : 유저가 현재 선택한 번호
 * totalPage : 페이지 최대수
 * editBoardContent : 유저가 수정 요청하는 보드 정보
 */
const useBoardStore = create<State & Action>((set) => ({
  ...initialState,

  setBoardSearch: (search: string) => set({ boardSearch: search }),
  setBoardType: (type: string) => set({ boardType: type }),
  initBoardSearch: () => set({ boardSearch: '', boardType: '' }),
  setCurPageNum: (update) =>
    set((state) => ({
      curPageNum: update(state.curPageNum),
    })),
  setTotalPage: (page: number) => set({ totalPage: page }),
  setEditBoardState: (boardState: EditBoardProps) =>
    set({
      editBoardState: boardState,
    }),
  initEditBoardState: () => set({ editBoardState: { title: '', content: '' } }),
}));

export default useBoardStore;
