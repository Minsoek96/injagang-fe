import { create } from "zustand";

type State = {
  targetFeed: number;
};

type Action = {
  setTargetFeed: (targetId: number) => void;
  initTargetFeed: () => void;
};

const useFeedStore = create<State & Action>(set => ({
  targetFeed: 0,
  setTargetFeed: (id: number) => set({ targetFeed: id }),
  initTargetFeed: () => set({ targetFeed: 0 }),
}));

export default useFeedStore