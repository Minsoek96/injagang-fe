import Cookies from 'js-cookie';

import { TOKEN_KEYS } from '@/src/shared/const';
import { AUTH_APIS } from '@/src/shared/config/apis';
import { fetcher, METHOD } from '@/src/shared/utils';

const tokenReissue = async () =>
  fetcher(METHOD.POST, AUTH_APIS.TOKKEN_REISSUE_API, {
    access: Cookies.get(TOKEN_KEYS.ACCESS_TOKEN),
    refresh: Cookies.get(TOKEN_KEYS.REFRESH_TOKEN),
  });

export {
  tokenReissue,
};
