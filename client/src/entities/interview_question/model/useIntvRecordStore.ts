import { create } from 'zustand';

import { devtools } from 'zustand/middleware';

type InterviewMode = 'pending' | 'record' | 'result';

type State = {
  interviewMode: InterviewMode;
  recordedChunks: Blob[];
};

type Action = {
  setRecordedChunks: (chunk: Blob[]) => void;
  setInterviewMode: (mode: InterviewMode) => void;
  clearRecordStates: () => void;
};

/**
 * 인터뷰 녹화 관련 상태 관리
 *
 * - interviewMode: 현재 인터뷰 모드 상태 ('pending', 'record', 'result')
 * - recordedChunks: 현재 녹화된 Blob 데이터
 */
const useIntvRecordStore = create<State & Action>()(
  devtools(
    (set) => ({
      interviewMode: 'record',
      recordedChunks: [],

      setRecordedChunks: (chunks: Blob[]) =>
        set(
          (state) => ({
            recordedChunks: [...state.recordedChunks, ...chunks],
          }),
        ),

      setInterviewMode: (mode: InterviewMode) =>
        set(
          { interviewMode: mode },
        ),

      clearRecordStates: () =>
        set(
          {
            recordedChunks: [],
            interviewMode: 'record',
          },
        ),
    }),
  ),
);
export default useIntvRecordStore;
