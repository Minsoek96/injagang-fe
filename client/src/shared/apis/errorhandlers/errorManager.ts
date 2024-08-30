import Router from 'next/router';

import Cookies from 'js-cookie';

import { AxiosRequestConfig, isAxiosError } from 'axios';

import { tokenReissue } from '@/src/shared/apis/tokenReissue';
import { ERROR_MESSAGES, TOKEN_KEYS } from '@/src/shared/const';

import { reRequest } from './reRequest';

const errorManager = async (
  message: string,
  originRequest: AxiosRequestConfig,
) => {
  switch (message) {
  case ERROR_MESSAGES.JWT_EXPIRED:
    jwtExpired(originRequest);
    break;
  default:
    unauthorized();
    break;
  }
};

/** jwt 만료시 처리 함수 */
const unauthorized = () => {
  const removeToken = () => {
    Cookies.remove(TOKEN_KEYS.ACCESS_TOKEN);
    Cookies.remove(TOKEN_KEYS.REFRESH_TOKEN);
    Cookies.remove('userId');
  };
  removeToken();
  Router.replace('/login');
};

/** jwt 검증 함수  */
const jwtExpired = async (originRequest: AxiosRequestConfig) => {
  try {
    const response = await tokenReissue();
    if (response) {
      const { access } = response.data;
      Cookies.set(TOKEN_KEYS.ACCESS_TOKEN, access);
      await reRequest(originRequest);
    }
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message;
      errorMessage && unauthorized();
    }
  }
};

export { errorManager };
