import Cookies from 'js-cookie';

import { fetcher, METHOD } from '@/src/shared/utils';
import { AUTH_APIS } from '@/src/shared/config/apis';
import { TOKEN_KEYS } from '@/src/shared/const';
import { tokenReissue } from '@/src/shared/apis/tokenReissue';

jest.mock('@/src/shared/utils', () => ({
  fetcher: jest.fn(),
  METHOD: {
    POST: 'POST',
  },
}));

jest.mock('js-cookie', () => ({
  get: jest.fn(),
}));

describe('tokenReissue 함수', () => {
  beforeEach(() => {
    (Cookies.get as jest.Mock).mockImplementation((key: string) => {
      if (key === TOKEN_KEYS.ACCESS_TOKEN) return 'mockAccessToken';
      if (key === TOKEN_KEYS.REFRESH_TOKEN) return 'mockRefreshToken';
      return null;
    });

    (fetcher as jest.Mock).mockResolvedValue({ data: 'mockData' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('토큰 재발행 API를 호출해야 한다', async () => {
    const response = await tokenReissue();

    expect(fetcher).toHaveBeenCalledWith(METHOD.POST, AUTH_APIS.TOKKEN_REISSUE_API, {
      access: 'mockAccessToken',
      refresh: 'mockRefreshToken',
    });

    expect(response).toEqual({ data: 'mockData' });
  });
});
