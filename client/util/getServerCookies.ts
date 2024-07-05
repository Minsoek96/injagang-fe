import { serverCookie } from '@/apis/serverCookie';

import { GetServerSidePropsContext } from 'next';

const getServerCookie = (context: GetServerSidePropsContext) => {
  const parsedCookies = serverCookie(context);
  const authToken = parsedCookies.accessToken;
  return authToken;
};

export default getServerCookie;
