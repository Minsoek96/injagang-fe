import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

const initialState: State = {
  userPlayList: [],
  selectedType: '',
};

/** 면접 녹화에 필요한 질문 설정 관련 정보
 *  - userPlayList : 유저가 선택한 타입별 질문
 *  - selectedTypes : 유저가 선택한 타입
 *  - initUserPlayList : 유저가 선택한 타입별 질문 초기화
 */
const useIntvPlaylistStore = create<State & Action>()(
  persist(
    (set) => ({
      ...initialState,

      setUserPlayList: (list: string[]) =>
        set((state) => {
          const { userPlayList } = state;
          // 현재 userPlayList에 없는 새로운 항목만 필터링
          const newItems = list.filter((item) => !userPlayList.includes(item));
          if (newItems.length === 0) {
            return state;
          }
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
    }),
    {
      name: 'intv-playlist-storage',
      partialize: (state) => ({
        userPlayList: state.userPlayList,
        selectedType: state.selectedType,
      }),
    },
  ),
);

export default useIntvPlaylistStore;
