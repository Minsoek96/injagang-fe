import { create } from 'zustand';

type DeviceState = {
  audioDevice: MediaDeviceInfo | null;
  videoDevice: MediaDeviceInfo | null;
};

type DeviceActions = {
  setAudioDevice: (device: MediaDeviceInfo) => void;
  setVideoDevice: (device: MediaDeviceInfo) => void;
  resetDevices: () => void;
};

/**
 * 녹화 장비 관련 상태 훅
 *
 * @property  audioDevices : "녹화 연결 장치 고유 아이디"
 * @property  videoDevices : "화면 연결 장치 고유 아이디"
 * @property  set~ : 장치 설정
 * @property  reset~ : 장치 초기화
 */
const useDeviceStore = create<DeviceState & DeviceActions>((set) => ({
  audioDevice: null,
  videoDevice: null,

  setAudioDevice: (device) => set({ audioDevice: device }),
  setVideoDevice: (device) => set({ videoDevice: device }),
  resetDevices: () => set({ audioDevice: null, videoDevice: null }),
}));

export default useDeviceStore;
