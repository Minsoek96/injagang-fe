import { GetServerSidePropsContext } from 'next';

import cookie from 'cookie';

import { serverCookie } from './serverCookie';

jest.mock('cookie');

describe('serverCookie 함수', () => {
  it('쿠키가 없을 때 빈 객체를 반환해야 한다', () => {
    const context = {
      req: {
        headers: {},
      },
    } as GetServerSidePropsContext;

    const result = serverCookie(context);
    expect(result).toEqual({});
  });

  it('쿠키가 있을 때 쿠키를 파싱하여 반환해야 한다', () => {
    const mockCookies = 'token=test; testId=1';
    const context = {
      req: {
        headers: {
          cookie: mockCookies,
        },
      },
    } as GetServerSidePropsContext;

    const parsedCookies = { token: 'test', testId: '1' };
    (cookie.parse as jest.Mock).mockReturnValue(parsedCookies);

    const result = serverCookie(context);
    expect(result).toEqual(parsedCookies);
  });
});
