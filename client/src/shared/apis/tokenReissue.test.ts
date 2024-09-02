import { fetcher, getCookies, METHOD } from '@/src/shared/utils';
import { AUTH_APIS } from '@/src/shared/config/apis';
import { tokenReissue } from '@/src/shared/apis/tokenReissue';

jest.mock('@/src/shared/utils', () => ({
  fetcher: jest.fn(),
  METHOD: {
    POST: 'POST',
  },
  getCookies: jest.fn(),
}));

describe('tokenReissue 함수', () => {
  const accessToken = 'mockAccessToken';
  const refreshToken = 'mockRefreshToken';
  const userId = 'mockUserId';

  beforeEach(() => {
    (getCookies as jest.Mock).mockReturnValue({
      accessToken,
      refreshToken,
      userId,
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
