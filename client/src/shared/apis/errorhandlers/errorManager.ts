import { AxiosError, AxiosRequestConfig } from 'axios';

import { tokenReissue } from '@/src/shared/apis/errorhandlers/tokenReissue';
import { ERROR_MESSAGES } from '@/src/shared/const';

import { removeCookies, setCookies } from '@/src/shared/utils';
import { reRequest } from './reRequest';

const errorManager = async (
  message: string,
  originRequest: AxiosRequestConfig,
  error: AxiosError,
) => {
  switch (message) {
  case ERROR_MESSAGES.JWT_EXPIRED:
    jwtExpired(originRequest);
    break;
  default:
    unauthorized(error);
    break;
  }
};

/** jwt 만료시 처리 함수 */
const unauthorized = (error: AxiosError) => {
  removeCookies();
  return Promise.reject(error);
  // if (typeof window !== 'undefined') {
  //   Router.replace('/login');
  // }
};

/** jwt 검증 함수  */
const jwtExpired = async (originRequest: AxiosRequestConfig) => {
  try {
    const response = await tokenReissue();
    if (response) {
      const { access } = response.data;
      setCookies({ accessToken: access });
      await reRequest(originRequest);
    }
  } catch (error) {
    // errorManager처리 순환을 위한 캐치만
  }
};

export { errorManager };
