import { TOKEN_KEYS } from '@/src/shared/const';

import Cookies from 'js-cookie';

const getCookies = () => {
  const accessToken = Cookies.get(TOKEN_KEYS.ACCESS_TOKEN);
  const refreshToken = Cookies.get(TOKEN_KEYS.REFRESH_TOKEN);
  const userId = Cookies.get('userId');
  return { accessToken, refreshToken, userId };
};

const removeCookies = () => {
  Cookies.remove(TOKEN_KEYS.ACCESS_TOKEN);
  Cookies.remove(TOKEN_KEYS.REFRESH_TOKEN);
  Cookies.remove('userId');
};

const setCookies = ({
  accessToken,
  refreshToken,
  userId,
}: {
  accessToken?: string;
  refreshToken?: string;
  userId?: string;
}) => {
  if (accessToken) {
    Cookies.set(TOKEN_KEYS.ACCESS_TOKEN, accessToken, { expires: 1 });
  }
  if (refreshToken) {
    Cookies.set(TOKEN_KEYS.REFRESH_TOKEN, refreshToken, { expires: 1 });
  }
  if (userId) {
    Cookies.set('userId', userId, { expires: 1 });
  }
};

export { getCookies, removeCookies, setCookies };
