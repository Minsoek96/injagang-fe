import Cookies from 'js-cookie';

import { getCookies, removeCookies, setCookies } from '@/src/shared/utils';

jest.mock('js-cookie');

describe('cookiesManager', () => {
  const context = describe;
  const mockAccessToken = 'mockAccessToken';
  const mockRefreshToken = 'mockRefreshToken';

  context('getCookies', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('쿠키 값을 가져온다.', () => {
      (Cookies.get as jest.Mock).mockReturnValueOnce({
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
      });
      const { accessToken, refreshToken } = getCookies();
      expect(accessToken).toEqual(accessToken);
      expect(refreshToken).toEqual(refreshToken);
    });
  });

  context('removeCookies', () => {
    it('쿠키정보를 삭제한다.', () => {
      removeCookies();
      expect(Cookies.remove).toHaveBeenCalledTimes(3);
    });
  });

  context('setCookies', () => {
    it('모튼 쿠키를 설정한다', () => {
      setCookies({
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
        userId: 'mockUser',
      });
      expect(Cookies.set).toHaveBeenCalledTimes(3);
    });
  });
});
