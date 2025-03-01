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
  try {
    if (message === ERROR_MESSAGES.JWT_EXPIRED) {
      return await jwtExpired(originRequest);
    }
    return unauthorized(error);
  } catch (e) {
    return Promise.reject(e);
  }
};

/** jwt 만료시 처리 함수 */
const unauthorized = (error: AxiosError) => {
  removeCookies();
  return Promise.reject(error);
};

/** jwt 검증 함수  */
const jwtExpired = async (originRequest: AxiosRequestConfig) => {
  try {
    const response = await tokenReissue();
    if (response) {
      const { access } = response.data;
      setCookies({ accessToken: access });
      return await reRequest(originRequest);
    }
    throw new Error('토큰 재발급 응답이 없습니다');
  } catch (error) {
    return Promise.reject(error);
  }
};

export { errorManager };
