import { create } from 'zustand';

// TODOS : 스토어 분리 생각하기!!!
type RecordInfo = {
  script: string;
  timer: string;
  voiceScript: string;
};

type InterviewMode = 'pending' | 'record' | 'result';

type State = {
  // API 관련 상태
  interviewMode: InterviewMode;
  recordedChunks: Blob[];
  audioDevice: MediaDeviceInfo | null;
  videoDevice: MediaDeviceInfo | null;
  // 유저 관련 상태
  recordInfoList: RecordInfo[];
  curVoiceScript: string;
  curScript: string;
  curTimer: string;
};

type Action = {
  addRecordInfo: (info: RecordInfo) => void;
  initRecordInfoList: () => void;

  setCurTimer: (timer: string) => void;
  setCurScript: (script: string) => void;
  setCurVoiceScript: (voice: string) => void;
  initCurinfos: () => void;

  setAudioDevice: (devices: MediaDeviceInfo) => void;
  setVideoDevice: (devices: MediaDeviceInfo) => void;
  initDevices: () => void;

  setRecordedChunks: (chunk: Blob[]) => void;
  setInterviewMode: (mode: InterviewMode) => void;
};

/**
 * interviewMode : "현재 인터뷰 모드를 의미"
 * recordedChunks : "현재 녹화된 Blob"
 * audioDevices : "녹화 연결 장치 고유 아이디"
 * videoDevices : "화면 연결 장치 고유 아이디"
 * recordInfoList : "유저가 녹화한 순서별 스크립트 기록"
 * curScript: "현재 녹화 입력 대본 기록"
 * curTimer: "현재 녹화 타이머 기록"
 * curVoiceScript: "현재 완료된 음성 기록"
 */
const useRecordInfoStore = create<State & Action>((set) => ({
  interviewMode: 'record',
  audioDevice: null,
  videoDevice: null,
  curScript: '',
  curTimer: '',
  curVoiceScript: '',
  recordInfoList: [],
  recordedChunks: [],

  setCurTimer: (curTimer: string) => set({ curTimer }),
  setCurScript: (curScript: string) => set({ curScript }),
  setCurVoiceScript: (curVoiceScript: string) => set({ curVoiceScript }),
  initCurinfos: () => set({ curTimer: '', curScript: '', curVoiceScript: '' }),

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
