import { create } from 'zustand';
import { toastType } from '@/src/shared/types';

type State = {
  toastList: toastType.IToast[];
};

type Action = {
  showToastAction: (toast: toastType.IToast) => void;
  hideToastAction: (id: string) => void;
};

const useToastStore = create<State & Action>((set) => ({
  toastList: [],
  showToastAction: (showToast: toastType.IToast) => {
    set((state) => ({
      toastList: [...state.toastList, showToast],
    }));
  },
  hideToastAction: (target: string) => {
    set((state) => ({
      toastList: state.toastList.filter((toast) => toast.id !== target),
    }));
  },
}));

export default useToastStore;
