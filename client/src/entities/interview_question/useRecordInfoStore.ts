import { create } from 'zustand';

type RecordInfo = {
  script: string;
  timer: string;
};

type VideoSatus = 'record' | 'pause' | 'pending';

type State = {
  videoStatus: VideoSatus;
  curVideoMode: 'result' | 'interview';
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
  setVideoStatus: (state: VideoSatus) => void;
  initDevices: () => void;
  toggleVideoMode: () => void;
};

/**
 * videoStatus : "현재 녹화 진행상태"
 * curVideoMode : "유저 화면 선택상황"
 * devices : "녹화 장치 연결 장치 아이디"
 * recordInfoList : "유저가 녹화한 순서"
 * curScript: "현재 녹화 입력 대본 기록"
 * curTimer: "현재 녹화 타이머 기록"
 */

const useRecordInfoStore = create<State & Action>((set) => ({
  videoStatus: 'pending',
  curVideoMode: 'interview',
  audioDevice: null,
  videoDevice: null,
  curScript: '',
  curTimer: '',
  recordInfoList: [],
  setCurTimer: (curTimer: string) => set({ curTimer }),
  setCurScript: (curScript: string) => set({ curScript }),
  addRecordInfo: (newInfo: RecordInfo) => {
    set((state) => ({
      recordInfoList: [...state.recordInfoList, newInfo],
    }));
  },
  initRecordInfoList: () => set({ recordInfoList: [] }),
  initCurinfos: () => set({ curTimer: '', curScript: '' }),
  setVideoStatus: (state: VideoSatus) => set({ videoStatus: state }),
  toggleVideoMode: () => {
    set((state) => ({
      curVideoMode: state.curVideoMode === 'interview' ? 'result' : 'interview',
    }));
  },
  setAudioDevice: (device: MediaDeviceInfo) => set({ audioDevice: device }),
  setVideoDevice: (device: MediaDeviceInfo) => set({ videoDevice: device }),
  initDevices: () => set({ audioDevice: null, videoDevice: null }),
}));

export default useRecordInfoStore;
