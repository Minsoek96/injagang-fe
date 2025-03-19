import { create } from 'zustand';

type RecordContent = {
  script: string;
  timer: string;
  voiceScript: string;
  strengths: string[];
  improvements: string[];
};

type State = {
  recordContents: RecordContent[];
  curScript: string;
  curTimer: string;
  curVoiceScript: string;
  isVoiceTranscription: boolean;
};

type Action = {
  addRecordContent: (content: RecordContent) => void;
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

  // 액션 - 기록 목록
  addRecordContent: (newContent: RecordContent) => {
    set((state) => ({
      recordContents: [...state.recordContents, newContent],
    }));
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
}));

export default useIntvContentStore;
