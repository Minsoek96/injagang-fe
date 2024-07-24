import { AxiosRequestConfig } from 'axios';

import { API } from '@/src/shared/apis/client';
import { reRequest } from './reRequest';

jest.mock('@/src/shared/apis/client', () => ({
  API: {
    request: jest.fn(),
  },
}));

describe('reRequest', () => {
  const context = describe;
  const mockedAPI = API as jest.Mocked<typeof API>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('재요청 3회 이하의 경우', () => {
    it('재시도 요청의 성공하면 올바른 응답을 반환한다.', async () => {
      const originRequest: AxiosRequestConfig & { retryFetch?: number } = {
        url: '/test',
        method: 'get',
        retryFetch: 1,
      };

      mockedAPI.request.mockImplementation(
        (config: AxiosRequestConfig & { retryFetch?: number }) => {
          if (config.retryFetch && config.retryFetch >= 2) {
            return Promise.resolve({ status: 200, data: 'success' });
          }
          return Promise.reject(new Error('Request failed'));
        },
      );

      const response = await reRequest(originRequest);

      expect(response.status).toBe(200);
      expect(response.data).toEqual('success');
    });
  });

  context('재요청 3회 이상의 경우', () => {
    it('요청이 3회 재시도 후에도 실패하면 에러를 발생 시켜야 한다.', async () => {
      const originRequest: AxiosRequestConfig & { retryFetch?: number } = {
        url: '/test',
        method: 'get',
        retryFetch: 2,
      };

      mockedAPI.request.mockImplementation(
        (config: AxiosRequestConfig & { retryFetch?: number }) => {
          if (config.retryFetch && config.retryFetch >= 3) {
            return Promise.reject(new Error('요청 제한 횟수 초과'));
          }
          return Promise.reject(new Error('Request failed'));
        },
      );

      await expect(reRequest(originRequest)).rejects.toThrow(
        '요청 제한 횟수 초과',
      );
    });
  });

  it('retryFetch가 없는 요청이 실패 후 재시도하여 성공하면 올바른 응답을 반환해야 한다.', async () => {
    const originRequest: AxiosRequestConfig = {
      url: '/test',
      method: 'get',
    };

    mockedAPI.request.mockImplementation(
      (config: AxiosRequestConfig & { retryFetch?: number }) => {
        if (config.retryFetch && config.retryFetch >= 1) {
          return Promise.resolve({ status: 200, data: 'success' });
        }
        return Promise.reject(new Error('Request failed'));
      },
    );

    const response = await reRequest(originRequest);

    expect(response.status).toBe(200);
    expect(response.data).toEqual('success');
  });
});
