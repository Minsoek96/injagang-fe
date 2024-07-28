import { API } from '@/src/shared/apis/client';

import { AxiosRequestConfig, AxiosResponse } from 'axios';

const RETRY_MAX = 3;

const reRequest = async (
  originRequest: AxiosRequestConfig & { retryFetch?: number },
): Promise<AxiosResponse> => {
  const requestWithRetry = {
    ...originRequest,
    retryFetch: originRequest.retryFetch || 0,
  };

  try {
    return await API.request(requestWithRetry);
  } catch (error) {
    requestWithRetry.retryFetch += 1;

    if (requestWithRetry.retryFetch >= RETRY_MAX) {
      throw new Error('요청 제한 횟수 초과');
    }

    return reRequest(requestWithRetry);
  }
};

export {
  reRequest,
};
