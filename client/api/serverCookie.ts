import { GetServerSidePropsContext } from 'next';
import cookie from 'cookie';

//* 서버 요청시 인증 토큰 *//
export function serverCookie(context: GetServerSidePropsContext) {
  const cookies = context.req.headers.cookie;
  const parsedCookies = cookies ? cookie.parse(cookies) : {};
  return parsedCookies;
}
