import { useRouter } from 'next/router';

import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/src/shared/hooks';

import { useAuthStore } from '@/src/entities/auth';

import {
  IChangePw,
  IResponseSignin,
  ISignin,
  ISignup,
  IUserInfo,
} from '@/src/entities/auth/model/type';

import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  TOAST_MODE,
} from '@/src/shared/const';
import { getCookies, removeCookies, setCookies } from '@/src/shared/utils';

import {
  authInfo,
  checkOut,
  login,
  nickChange,
  passwordChange,
  signup,
} from './apis';

const useFetchSignin = () => {
  const setUserId = useAuthStore((state) => state.setUserId);
  const { showToast } = useToast();
  const router = useRouter();
  const { returnUrl } = router.query;

  const redirectToReturnUrl = () => {
    if (returnUrl) {
      router.replace(decodeURIComponent(returnUrl as string));
    } else {
      router.replace('/');
    }
  };

  const mutate = useMutation({
    mutationFn: (loginData: ISignin) =>
      login(loginData).then((res) => res.data),

    onSuccess: (data: IResponseSignin) => {
      const { access, userId } = data;
      setCookies({ accessToken: access, userId });
      setUserId(userId);
      redirectToReturnUrl();
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.DOESN_T_MATCH);
    },
  });
  return { ...mutate };
};

const useFetchCheckOut = () => {
  const { showToast } = useToast();
  const nickName = useAuthStore((state) => state.nickName);
  const initCurrentUser = useAuthStore((state) => state.initCurrentUser);

  const { accessToken } = getCookies();

  const currentToken = {
    access: accessToken,
  };

  return useMutation({
    mutationFn: () => checkOut(currentToken),

    onSuccess: () => {
      showToast(
        TOAST_MODE.SUCCESS,
        SUCCESS_MESSAGES.CHECK_OUT(nickName ?? '게스트'),
      );
    },

    // TODO : 고민해보기 로그아웃 실패가 과연 좋은 메시지일까???..
    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.CHECK_OUT);
    },

    onSettled: () => {
      removeCookies();
      initCurrentUser();
    },
  });
};

const useFetchUserInfo = () => {
  const { showToast } = useToast();
  const setUserInfo = useAuthStore((state) => state.setUserInfo);

  return useMutation({
    mutationFn: () => authInfo(),

    onSuccess: (data: IUserInfo) => {
      const { nickname, role } = data;
      setUserInfo(nickname, role);
      showToast(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.GET_PROFILE(nickname));
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.GET_PROFILE);
      removeCookies();
    },

    throwOnError: true,
  });
};

const useChangeNick = () => {
  const { showToast } = useToast();
  const setUserInfo = useAuthStore((state) => state.setUserInfo);
  const role = useAuthStore((state) => state.role);
  return useMutation({
    mutationFn: (changeNickname: string) =>
      nickChange({ changeNickname }).then(() => {}),

    onSuccess: (_, newNick) => {
      showToast(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.CHANGE_NICK);
      setUserInfo(newNick, role ?? 'USER');
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.CHANGE_NICK);
    },
  });
};

const useChangePassWord = () => {
  const { showToast } = useToast();
  return useMutation({
    mutationFn: (newPw: IChangePw) => passwordChange(newPw),

    onSuccess: () => {
      showToast(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.CHANGE_PASSWORD);
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.DOESN_T_MATCH_PASSWORD);
    },
  });
};

const useFetchSignup = () => {
  const router = useRouter();
  const { showToast } = useToast();
  return useMutation({
    mutationFn: (joinData: ISignup) => signup(joinData),

    onSuccess: () => {
      showToast(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.ADDED_USER);
      router.replace('login');
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.ADDED_USER);
    },
  });
};
export {
  useFetchSignin,
  useFetchCheckOut,
  useFetchUserInfo,
  useChangeNick,
  useChangePassWord,
  useFetchSignup,
};
