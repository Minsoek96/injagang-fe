import Router from 'next/router';

import Cookies from 'js-cookie';

import { tokenReissue } from '@/src/shared/apis/tokenReissue';
import { ERROR_MESSAGES, TOKEN_KEYS } from '@/src/shared/const';

import { reRequest } from './reRequest';
import { errorManager } from './errorManager';

jest.mock('next/router', () => ({
  replace: jest.fn(),
}));

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

jest.mock('@/src/shared/apis/tokenReissue', () => ({
  tokenReissue: jest.fn(),
}));

jest.mock('./reRequest', () => ({
  reRequest: jest.fn(),
}));

describe('errorManager', () => {
  const context = describe;
  const mockedRouter = Router as jest.Mocked<typeof Router>;
  const mockedCookies = Cookies as jest.Mocked<typeof Cookies>;
  const mockedTokenReissue = tokenReissue as jest.Mock;
  const mockedReRequest = reRequest as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('오류 메시지가 JWT_EXPIRED일 때', () => {
    it('jwtExpired를 호출하고 토큰 재발행이 성공해야 한다', async () => {
      const originRequest = { url: '/test', method: 'get' };
      const newTokenValue = 'new_access_token';

      mockedTokenReissue.mockResolvedValueOnce({
        data: { access: newTokenValue },
      });

      await errorManager(ERROR_MESSAGES.JWT_EXPIRED, originRequest);

      expect(mockedTokenReissue).toHaveBeenCalled();
      expect(mockedCookies.set).toHaveBeenCalledWith(
        TOKEN_KEYS.ACCESS_TOKEN,
        newTokenValue,
      );
      expect(mockedReRequest).toHaveBeenCalledWith(originRequest);
    });

    it('토큰 재발행이 실패하면 로그인 페이지로 이동한다', async () => {
      const originRequest = { url: '/test', method: 'get' };
      const errorResponse = {
        isAxiosError: true,
        response: {
          status: 401,
          data: { message: 'Unauthorized' },
          config: originRequest,
          headers: {},
        },
        config: originRequest,
      };

      mockedTokenReissue.mockRejectedValueOnce(errorResponse);

      await errorManager(ERROR_MESSAGES.JWT_EXPIRED, originRequest);

      expect(mockedTokenReissue).toHaveBeenCalled();
      expect(mockedRouter.replace).toHaveBeenCalledWith('/login');
    });
  });

  context('오류 메시지가 JWT_EXPIRED가 아닐 때', () => {
    it('아무 함수도 호출되지 않아야 한다', () => {
      const originRequest = { url: '/test', method: 'get' };

      errorManager('unknown error', originRequest);

      expect(mockedTokenReissue).not.toHaveBeenCalled();
      expect(mockedRouter.replace).not.toHaveBeenCalled();
      expect(mockedReRequest).not.toHaveBeenCalled();
    });
  });
});
