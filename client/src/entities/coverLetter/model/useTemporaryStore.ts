import { create } from 'zustand';
import { persist, PersistStorage, StorageValue } from 'zustand/middleware';

import { coverLetterType } from '@/src/entities/coverLetter';
import { LocalStorageManager } from '@/src/shared/utils';

type State = {
    draftCoverLetter: coverLetterType.IWriteCoverLetter | null;
}

type Action = {
    setDraft: (draft: coverLetterType.IWriteCoverLetter) => void;
    clearDraft: () => void;
}

const storage = new LocalStorageManager('temp-store');

// 데이터 만료기한 스토리지
const customStorage: PersistStorage<State> = {
  getItem: async () => {
    const data = storage.get();
    return data as StorageValue<State>;
  },
  setItem: (_, value) => {
    storage.save(value, { expirationDate: 2 });
  },
  removeItem: () => {
    storage.delete();
  },
};

const useTempStore = create<State & Action>()(
  persist(
    (set) => ({
      draftCoverLetter: null,
      setDraft: (draft) => set({ draftCoverLetter: draft }),
      clearDraft: () => { storage.delete(); },
    }),
    {
      name: 'temp-store',
      storage: customStorage,
      partialize: (state) => ({ draftCoverLetter: state.draftCoverLetter }),
    },
  ),
);

export default useTempStore;
