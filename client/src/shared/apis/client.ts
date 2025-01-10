import axios from 'axios';

import { getCookies } from '@/src/shared/utils';
import { errorManager } from './errorhandlers';
import { SERVER } from '../config/apis';

export const API = axios.create({
  baseURL: SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
});

// TODO : serverDisconnected 와 errorManger같은 에러 핸들링 제거
// GlobalErrorBoundary 에서 처리할 것
// interceptors는 액세스 토큰 재발급 , 리프레쉬 만료에 대한 처리만 수행하는 방향
// 로그인 페이지 전환은 에러바운더리 ? 현재 방식 ? 생각해보기
// 임시적으로 api/test 는 예외처리

API.interceptors.request.use(
  (config) => {
    const { accessToken } = getCookies();
    if (accessToken) {
      const newConfig = { ...config };
      newConfig.headers.Authorization = `Bearer ${accessToken}`;
      return newConfig;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      throw error;
    }
    const originRequest = error.response;
    const { status, config } = originRequest;
    const errorMessage = originRequest.data.message;

    if (status === 401 && !config.isRetrying) {
      try {
        await errorManager(errorMessage, config, error);
      // eslint-disable-next-line no-shadow
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
