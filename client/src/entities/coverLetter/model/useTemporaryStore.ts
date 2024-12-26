import { coverLetterType } from '@/src/entities/coverLetter';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
    draftCoverLetter: coverLetterType.ICoverLetter | null;
}

type Action = {
    setDraft: (draft: coverLetterType.ICoverLetter) => void;
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
