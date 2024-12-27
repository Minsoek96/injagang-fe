import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { coverLetterType } from '@/src/entities/coverLetter';

type State = {
    draftCoverLetter: coverLetterType.IWriteCoverLetter | null;
}

type Action = {
    setDraft: (draft: coverLetterType.IWriteCoverLetter) => void;
    clearDraft: () => void;
}

const useTempStore = create<State & Action>()(
  persist(
    (set) => ({
      draftCoverLetter: null,
      setDraft: (draft) => set({ draftCoverLetter: draft }),
      clearDraft: () => set({ draftCoverLetter: null }),
    }),
    {
      name: 'temp-store',
      partialize: (state) => ({ draftCoverLetter: state.draftCoverLetter }),
    },
  ),
);

export default useTempStore;
