import { API } from '@/src/shared/apis/client';
import { AxiosRequestConfig } from 'axios';

const reRequest = async (
  originRequest: AxiosRequestConfig & { retryFetch?: number },
) => {
  const requestWithRetry = {
    ...originRequest,
    retryFetch: originRequest.retryFetch || 0,
  };

  if (requestWithRetry.retryFetch >= 3) {
    throw new Error('요청 제한 횟수 초과');
  }
  requestWithRetry.retryFetch += 1;
  return API.request(requestWithRetry);
};

export {
  reRequest,
};
