import { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import { ERROR_MESSAGES, TOKEN_KEYS } from '@/src/shared/const';

import { reRequest } from './reRequest';
import { errorManager } from './errorManager';
import { tokenReissue } from './tokenReissue';

jest.mock('next/router', () => ({
  replace: jest.fn(),
}));

jest.mock('js-cookie');

jest.mock('./tokenReissue', () => ({
  tokenReissue: jest.fn(),
}));

jest.mock('./reRequest', () => ({
  reRequest: jest.fn(),
}));

describe('errorManager', () => {
  const context = describe;
  const mockedCookies = Cookies as jest.Mocked<typeof Cookies>;
  const mockedTokenReissue = tokenReissue as jest.Mock;
  const mockedReRequest = reRequest as jest.Mock;

  // Axios 에러 객체 생성
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
  } as unknown as AxiosError;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('오류 메시지가 JWT_EXPIRED일 때', () => {
    it('토큰을 재발급하고 성공적으로 재요청해야 한다', async () => {
      const newTokenValue = 'new_access_token';
      const reRequestResponse = { data: { success: true } };

      mockedTokenReissue.mockResolvedValueOnce({
        data: { access: newTokenValue },
      });
      mockedReRequest.mockResolvedValueOnce(reRequestResponse);

      const result = await errorManager(ERROR_MESSAGES.JWT_EXPIRED, originRequest, errorResponse);

      expect(mockedTokenReissue).toHaveBeenCalled();
      expect(mockedReRequest).toHaveBeenCalledWith(originRequest);

      expect(result).toEqual(reRequestResponse);
    });

    it('토큰 재발급에 실패하면 오류를 반환하고 쿠키를 제거해야 한다', async () => {
      mockedTokenReissue.mockRejectedValueOnce(errorResponse);

      await expect(
        errorManager(ERROR_MESSAGES.REFRESH_TOKEN_EXPIRED, originRequest, errorResponse),
      ).rejects.toMatchObject(errorResponse);

      expect(mockedCookies.remove).toHaveBeenCalledWith(TOKEN_KEYS.ACCESS_TOKEN);
      expect(mockedCookies.remove).toHaveBeenCalledWith('userId');
    });

    it('토큰 재발급은 성공했지만 재요청에 실패하면 오류를 반환해야 한다', async () => {
      const newTokenValue = 'new_access_token';
      const reRequestError = new Error('토큰 재발급 응답이 없습니다');

      mockedTokenReissue.mockResolvedValueOnce({
        data: { access: newTokenValue },
      });
      mockedReRequest.mockRejectedValueOnce(reRequestError);

      await expect(
        errorManager(ERROR_MESSAGES.JWT_EXPIRED, originRequest, errorResponse),
      ).rejects.toBeDefined();

      expect(mockedTokenReissue).toHaveBeenCalled();
    });

    it('토큰 재발급 응답이 없으면 오류를 반환해야 한다', async () => {
      mockedTokenReissue.mockResolvedValueOnce(null);

      await expect(
        errorManager(ERROR_MESSAGES.JWT_EXPIRED, originRequest, errorResponse),
      ).rejects.toThrow('토큰 재발급 응답이 없습니다');

      expect(mockedTokenReissue).toHaveBeenCalled();
    });
  });

  context('오류 메시지가 JWT_EXPIRED가 아닐 때', () => {
    it('쿠키를 제거하고 오류를 반환해야 한다', async () => {
      await expect(
        errorManager('unknown error', originRequest, errorResponse),
      ).rejects.toEqual(errorResponse);

      expect(mockedCookies.remove).toHaveBeenCalledWith(TOKEN_KEYS.ACCESS_TOKEN);
      expect(mockedCookies.remove).toHaveBeenCalledWith('userId');

      expect(mockedTokenReissue).not.toHaveBeenCalled();
    });
  });
});
