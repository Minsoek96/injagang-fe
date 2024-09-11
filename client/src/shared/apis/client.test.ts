import Cookies from 'js-cookie';

import { ERROR_MESSAGES } from '@/src/shared/const';

import { API } from './client';
import { tokenReissue } from './tokenReissue';

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

jest.mock('./tokenReissue', () => ({
  tokenReissue: jest.fn(),
}));

jest.mock('axios', () => ({
  create: () => ({
    interceptors: {
      request: { eject: jest.fn(), use: jest.fn() },
      response: { eject: jest.fn(), use: jest.fn() },
    },
    request: jest.fn(),
    get: jest.fn(),
  }),
}));

const mockedTokenReissue = tokenReissue as jest.Mock;

describe('API Interceptors', () => {
  const context = describe;

  context('요청 인터셉트', () => {
    it('액세스 토큰이 쿠키에 있으면 Authorization 헤더를 추가해야 합니다', () => {
      const token = { key: 'test_token' };
      (Cookies.get as jest.Mock).mockReturnValue(token);

      const config = { headers: {} };

      const requestInterceptor = API.interceptors.request.use as jest.Mock;
      const requestHandler = requestInterceptor.mock.calls[0][0];
      const result = requestHandler(config);

      expect(result.headers.Authorization).toBe(`Bearer ${token}`);
    });

    it('액세스 토큰이 쿠키가 없으면 Authorization 헤더를 추가하지 않는다.', () => {
      (Cookies.get as jest.Mock).mockReturnValueOnce(undefined);

      const config = { headers: {} };

      const requestInterceptor = API.interceptors.request.use as jest.Mock;
      const requestHandler = requestInterceptor.mock.calls[0][0];
      const result = requestHandler(config);

      expect(result.headers).not.toHaveProperty('Authorization');
    });
  });

  context('응답 인터셉트', () => {
    it('401 에러를 처리하고 토큰 재발급을 시행한다.', async () => {
      const error = {
        response: {
          status: 401,
          data: { message: ERROR_MESSAGES.JWT_EXPIRED },
          config: {},
        },
        headers: {},
      };

      mockedTokenReissue.mockResolvedValue({ data: { access: 'new_token' } });
      (Cookies.get as jest.Mock).mockReturnValueOnce({ key: 'new_token' });

      const requestInterceptor = API.interceptors.response.use as jest.Mock;
      const responseHandler = requestInterceptor.mock.calls[0][1];
      const result = responseHandler(error);
      await expect(result).rejects.toEqual(error);
      expect(mockedTokenReissue).toHaveBeenCalled();
    });
  });
});
