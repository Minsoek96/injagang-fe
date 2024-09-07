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
  initConfirmQuestions: () => void;
};

/** 면접 녹화에 필요한 질문 설정 관련 정보
 *  - usePlayList : 유저가 선택한 타입별 질문
 *  - selectedTypes : 유저가 선택한 타입
 *  - confirmQuestions :  유저가 최종적으로 컨펌한 질문
 *  - initUserPlayList : 유저가 선택한 타입별 질문 초기화
 *  - initConfromQuestions : 유저가 면접리스트로 컨펌한 질문 초기화
*/
const useQuestionStore = create<State & Action>((set) => ({
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
  initConfirmQuestions: () => set({ confirmQuestions: [] }),
}));

export default useQuestionStore;
