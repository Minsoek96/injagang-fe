import { IToast, TOAST_MODE } from "@/hooks/useToast";
import { create } from "zustand";

type State = {
  toastList: IToast[];
};

type Action = {
  showToastAction: (toast: IToast) => void;
  hideToastAction: (id: string) => void;
};

const useToastStore = create<State & Action>(set => ({
  toastList: [],
  showToastAction: (showToast: IToast) => {
    set(state => ({
      toastList: [...state.toastList, showToast],
    }));
  },
  hideToastAction: (target: string) => {
    set(state => ({
      toastList: state.toastList.filter(toast => toast.id !== target),
    }));
  },
}));

export default useToastStore