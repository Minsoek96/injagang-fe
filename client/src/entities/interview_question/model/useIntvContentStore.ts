import { create } from 'zustand';

import { RecordContent } from './type';

type State = {
  recordContents: RecordContent[];
  curScript: string;
  curTimer: string;
  curVoiceScript: string;
  isFeedModalOpen: boolean;
  isVoiceTranscription: boolean;
};

type Action = {
  addRecordContent: () => void;
  updateRecordContent: (
    idx: number,
    partialContent: Partial<RecordContent>
  ) => void;
  clearRecordContents: () => void;

  // 현재 콘텐츠 관련 액션
  setCurScript: (script: string) => void;
  setCurTimer: (timer: string) => void;
  setCurVoiceScript: (voice: string) => void;
  clearCurContent: () => void;
  toggleVoiceTranscription: () => void;
  setFeedModalOpen: (isOpen: boolean) => void;
};

/**
 * 인터뷰 콘텐츠 관련 상태 관리
 *
 * - recordContentList: 유저가 녹화한 순서별 스크립트 기록
 * - curScript: 현재 녹화 입력 대본 기록
 * - curTimer: 현재 녹화 타이머 기록
 * - curVoiceScript: 현재 음성 인식/완료된 음성 기록
 */
const useIntvContentStore = create<State & Action>((set) => ({
  recordContents: [],
  curScript: '',
  curTimer: '',
  curVoiceScript: '',
  isVoiceTranscription: false,
  isFeedModalOpen: false,

  // 액션 - 기록 목록
  addRecordContent: () => {
    set((state) => {
      const newContent: RecordContent = {
        script: state.curScript,
        timer: state.curTimer,
        voiceScript: state.curVoiceScript,
        strengths: null,
        improvements: null,
        rating: null,
      };

      return {
        recordContents: [...state.recordContents, newContent],
      };
    });
  },

  updateRecordContent: (
    idx: number,
    partialContent: Partial<RecordContent>,
  ) => {
    set((state) => {
      const updatedContents = [...state.recordContents];

      updatedContents[idx] = {
        ...updatedContents[idx],
        ...partialContent,
      };
      return { recordContents: updatedContents };
    });
  },

  clearRecordContents: () => set({ recordContents: [] }),

  // 액션 - 현재 콘텐츠
  setCurScript: (curScript: string) => set({ curScript }),
  setCurTimer: (curTimer: string) => set({ curTimer }),
  setCurVoiceScript: (curVoiceScript: string) => set({ curVoiceScript }),
  clearCurContent: () =>
    set({
      curTimer: '',
      curScript: '',
      curVoiceScript: '',
    }),
  toggleVoiceTranscription: () =>
    set((state) => ({
      isVoiceTranscription: !state.isVoiceTranscription,
    })),

  setFeedModalOpen: (isShow: boolean) =>
    set(() => ({ isFeedModalOpen: isShow })),
}));

export default useIntvContentStore;
