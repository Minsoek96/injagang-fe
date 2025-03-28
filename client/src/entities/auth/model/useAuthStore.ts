import { create } from 'zustand';
import { authType } from '@/src/entities/auth';

type State = {
  userId: string | null;
  nickName: string | null;
  role: authType.RoleType | null;
};

type Action = {
  setUserId: (id: string) => void;
  setUserInfo: (nick: string, role: authType.RoleType) => void;
  initCurrentUser: () => void;
};

const useAuthStore = create<State & Action>((set) => ({
  userId: null,
  nickName: null,
  role: null,

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

  initCurrentUser: () =>
    set({
      userId: null,
      nickName: null,
      role: null,
    }),
}));

export default useAuthStore;
