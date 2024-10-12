import { create } from 'zustand';
import { authType } from '@/src/entities/auth';

type State = {
  userId: string | null;
  nickName: string | null;
  role: authType.RoleType | null;
  history: string | null;
};

type Action = {
  setUserId: (id: string) => void;
  setUserInfo: (nick: string, role: authType.RoleType) => void;
  initCurrentUser: () => void;
  setHistory: (history: string) => void;
};

const useAuthStore = create<State & Action>((set) => ({
  userId: null,
  nickName: null,
  role: null,
  history: null,

  setUserId: (id: string) =>
    set({
      userId: id,
    }),
  setUserInfo: (nick: string, role: authType.RoleType) => {
    set({
      nickName: nick,
      role,
    });
  },
  setHistory: (history: string) => {
    set({
      history,
    });
  },

  initCurrentUser: () =>
    set({
      userId: null,
      nickName: null,
      role: null,
      history: null,
    }),
}));

export default useAuthStore;
