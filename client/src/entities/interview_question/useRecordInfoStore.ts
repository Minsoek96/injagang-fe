import { create } from 'zustand';

type RecordInfo = {
  script: string;
  timer: string;
};

type InterviewMode = 'pending' | 'record' | 'result';

type State = {
  interviewMode: InterviewMode;
  recordedChunks: Blob[];
  audioDevice: MediaDeviceInfo | null;
  videoDevice: MediaDeviceInfo | null;
  recordInfoList: RecordInfo[];
  curScript: string;
  curTimer: string;
};

type Action = {
  addRecordInfo: (info: RecordInfo) => void;
  initRecordInfoList: () => void;

  setCurTimer: (timer: string) => void;
  setCurScript: (script: string) => void;
  initCurinfos: () => void;

  setAudioDevice: (devices: MediaDeviceInfo) => void;
  setVideoDevice: (devices: MediaDeviceInfo) => void;
  initDevices: () => void;

  setRecordedChunks: (chunk: Blob[]) => void;
  setInterviewMode: (mode: InterviewMode) => void;
};

/**
 * interviewMode : "현재 인터뷰 모드를 의미"
 * devices : "녹화 장치 연결 장치 고유 아이디"
 * recordInfoList : "유저가 녹화한 순서별 스크립트 기록"
 * curScript: "현재 녹화 입력 대본 기록"
 * curTimer: "현재 녹화 타이머 기록"
 */

const useRecordInfoStore = create<State & Action>((set) => ({
  interviewMode: 'record',
  audioDevice: null,
  videoDevice: null,
  curScript: '',
  curTimer: '',
  recordInfoList: [],
  recordedChunks: [],

  setCurTimer: (curTimer: string) => set({ curTimer }),
  setCurScript: (curScript: string) => set({ curScript }),
  initCurinfos: () => set({ curTimer: '', curScript: '' }),

  addRecordInfo: (newInfo: RecordInfo) => {
    set((state) => ({
      recordInfoList: [...state.recordInfoList, newInfo],
    }));
  },
  initRecordInfoList: () =>
    set({ recordInfoList: [], recordedChunks: [], interviewMode: 'record' }),

  setAudioDevice: (device: MediaDeviceInfo) => set({ audioDevice: device }),
  setVideoDevice: (device: MediaDeviceInfo) => set({ videoDevice: device }),
  initDevices: () => set({ audioDevice: null, videoDevice: null }),

  setRecordedChunks: (recordedChunks: Blob[]) => {
    set((state) => ({
      recordedChunks: [...state.recordedChunks, ...recordedChunks],
    }));
  },
  setInterviewMode: (mode: InterviewMode) => set({ interviewMode: mode }),
}));

export default useRecordInfoStore;
