import { AUTH_APIS } from '@/src/shared/config/apis';
import { fetcher, getCookies, METHOD } from '@/src/shared/utils';

/** 토큰 재발급 API */
const tokenReissue = async () => {
  const { accessToken } = getCookies();

  return fetcher(METHOD.POST, AUTH_APIS.TOKKEN_REISSUE_API, {
    access: accessToken,
  });
};
export {
  tokenReissue,
};
