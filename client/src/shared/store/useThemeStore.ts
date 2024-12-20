import { create } from 'zustand';

type State = {
  isDark: boolean;
};

type Action = {
  changeThemeMode: (isDark: boolean) => void;
};

const useThemeStore = create<State & Action>((set) => ({
  isDark: false,

  changeThemeMode: (isDark: boolean) =>
    set({
      isDark,
    }),
}));

export default useThemeStore;
