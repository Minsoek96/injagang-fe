import { useRouter } from 'next/router';

import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import Cookies from 'js-cookie';

import { useToast } from '@/src/shared/hooks';

import {
  ERROR_MESSAGES, SUCCESS_MESSAGES, TOAST_MODE, TOKEN_KEYS,
} from '@/src/shared/const';

import {
  IChangePw,
  IResponseSignin,
  ISignin,
  ISignup,
  IUserInfo,
} from '@/src/entities/auth/type';
import { useAuthStore } from '@/src/entities/auth';

import {
  authInfo,
  checkOut,
  login,
  nickChange,
  passwordChange,
  signup,
} from './apis';

const useFetchSignin = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const { setUserId } = useAuthStore();
  const router = useRouter();
  const mutate = useMutation({
    mutationFn: (loginData: ISignin) =>
      login(loginData).then((res) => res.data),

    onSuccess: (data: IResponseSignin) => {
      const { access, refresh, userId } = data;
      Cookies.set(TOKEN_KEYS.ACCESS_TOKEN, access, { expires: 1 });
      Cookies.set(TOKEN_KEYS.REFRESH_TOKEN, refresh, { expires: 1 });
      Cookies.set('userId', userId, { expires: 1 });
      setUserId(userId);
      router.replace('/');
    },
    onError: () => {
      setErrorMsg(ERROR_MESSAGES.DOESN_T_MATCH);
    },
  });
  return { ...mutate, errorMsg };
};

const useFetchCheckOut = () => {
  const { showToast } = useToast();
  const { nickName, initCurrentUser } = useAuthStore();

  const currentToken = {
    access: Cookies.get(TOKEN_KEYS.ACCESS_TOKEN),
    refresh: Cookies.get(TOKEN_KEYS.REFRESH_TOKEN),
  };

  const removeToken = () => {
    Cookies.remove(TOKEN_KEYS.ACCESS_TOKEN);
    Cookies.remove(TOKEN_KEYS.REFRESH_TOKEN);
    Cookies.remove('userId');
  };

  return useMutation({
    mutationFn: () => checkOut(currentToken),

    onSuccess: () => {
      showToast(
        TOAST_MODE.SUCCESS,
        SUCCESS_MESSAGES.CHECK_OUT(nickName ?? '게스트'),
      );
      removeToken();
      initCurrentUser();
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.CHECK_OUT);
    },
  });
};

// TODO : 임의로 토큰이 삭제된 경우 오류발생 대비(현재 조치)
const useFetchUserInfo = () => {
  const { showToast } = useToast();
  const { setUserInfo } = useAuthStore();

  const removeToken = () => {
    Cookies.remove(TOKEN_KEYS.ACCESS_TOKEN);
    Cookies.remove(TOKEN_KEYS.REFRESH_TOKEN);
    Cookies.remove('userId');
  };

  return useMutation({
    mutationFn: () => authInfo(),

    onSuccess: (data: IUserInfo) => {
      const { nickname, role } = data;
      setUserInfo(nickname, role);
      showToast(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.GET_PROFILE(nickname));
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.GET_PROFILE);
      removeToken();
    },
  });
};

const useChangeNick = () => {
  const { showToast } = useToast();
  const { setUserInfo, role } = useAuthStore();
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
