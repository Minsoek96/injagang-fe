import { create } from 'zustand';

type State = {
  selectedType: string;
  userPlayList: string[];
};

type Action = {
  setSelectedType: (type: string) => void;
  setUserPlayList: (list: string[]) => void;
  removePlayItem: (targetItem: string) => void;
  initUserPlayList: () => void;
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

  setUserPlayList: (list: string[]) =>
    set((state) => {
      const { userPlayList } = state;
      // 현재 userPlayList에 없는 새로운 항목만 필터링
      const newItems = list.filter((item) => !userPlayList.includes(item));
      return {
        userPlayList: [...userPlayList, ...newItems],
      };
    }),

  setSelectedType: (type: string) => set({ selectedType: type }),

  removePlayItem: (targetItem: string) => set((state) => {
    const { userPlayList } = state;
    const filterItem = userPlayList.filter((item) => item !== targetItem);
    return {
      userPlayList: filterItem,
    };
  }),

  initUserPlayList: () => set({ userPlayList: [] }),
}));

export default useQuestionStore;
