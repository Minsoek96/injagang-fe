import { serverCookie } from '@/apis/serverCookie';

import { GetServerSidePropsContext } from 'next';

const getServerCookie = (context: GetServerSidePropsContext, key: string) => {
  const storeKey = key ?? '';
  const parsedCookies = serverCookie(context);
  const cookieValue = parsedCookies[storeKey];
  return cookieValue;
};

export default getServerCookie;
