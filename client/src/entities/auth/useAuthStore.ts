import { create } from 'zustand';
import { RoleType } from '@/src/entities/auth/type';

type State = {
  userId: string | null;
  nickName: string | null;
  role: RoleType | null;
};

type Action = {
  setUserId: (id: string) => void;
  setUserInfo: (nick: string, role: RoleType) => void;
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
  setUserInfo: (nick: string, role: RoleType) => {
    console.log(role);
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
