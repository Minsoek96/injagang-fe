import { create } from 'zustand';

type RecordInfo = {
  script: string;
  timer: string;
};

type State = {
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
};

const useRecordInfoStore = create<State & Action>((set) => ({
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
}));

export default useRecordInfoStore;
