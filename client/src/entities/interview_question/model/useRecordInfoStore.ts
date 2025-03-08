import { create } from 'zustand';

type InterviewMode = 'pending' | 'record' | 'result';

type State = {
  // API 관련 상태
  interviewMode: InterviewMode;
  recordedChunks: Blob[];
};

type Action = {
  setRecordedChunks: (chunk: Blob[]) => void;
  setInterviewMode: (mode: InterviewMode) => void;
};

/**
 * interviewMode : "현재 인터뷰 모드를 의미"
 * recordedChunks : "현재 녹화된 Blob"
 * recordInfoList : "유저가 녹화한 순서별 스크립트 기록"
 * curVoiceScript :  "현재 음성 인식 기록"
 * curScript: "현재 녹화 입력 대본 기록"
 * curTimer: "현재 녹화 타이머 기록"
 * curVoiceScript: "현재 완료된 음성 기록"
 */
const useRecordInfoStore = create<State & Action>((set) => ({
  interviewMode: 'record',
  recordedChunks: [],

  initRecordInfoList: () =>
    set({ recordedChunks: [], interviewMode: 'record' }),

  setRecordedChunks: (recordedChunks: Blob[]) => {
    set((state) => ({
      recordedChunks: [...state.recordedChunks, ...recordedChunks],
    }));
  },
  setInterviewMode: (mode: InterviewMode) => set({ interviewMode: mode }),
}));

export default useRecordInfoStore;
