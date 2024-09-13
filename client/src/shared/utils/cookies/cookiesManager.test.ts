import Cookies from 'js-cookie';

import { getCookies, removeCookies, setCookies } from '@/src/shared/utils';

jest.mock('js-cookie');

describe('cookiesManager', () => {
  const context = describe;
  const mockAccessToken = 'mockAccessToken';

  context('getCookies', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('쿠키 값을 가져온다.', () => {
      (Cookies.get as jest.Mock).mockReturnValueOnce({
        accessToken: mockAccessToken,
      });
      const { accessToken } = getCookies();
      expect(accessToken).toEqual(accessToken);
    });
  });

  context('removeCookies', () => {
    it('쿠키정보를 삭제한다.', () => {
      removeCookies();
      expect(Cookies.remove).toHaveBeenCalledTimes(2);
    });
  });

  context('setCookies', () => {
    it('모튼 쿠키를 설정한다', () => {
      setCookies({
        accessToken: mockAccessToken,
        userId: 'mockUser',
      });
      expect(Cookies.set).toHaveBeenCalledTimes(2);
    });
  });
});
