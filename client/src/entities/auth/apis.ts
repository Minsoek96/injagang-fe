import Cookies from 'js-cookie';

import {
  ISignin,
  ISignup,
  ICheckOut,
  ChangeNick,
  IChangePw,
  IUserInfo,
} from '@/src/entities/auth/type';

import { TOKEN_KYES } from '@/src/shared/const';

import { fetcher, METHOD } from '@/src/shared/utils';

import { AUTH_APIS } from '@/src/shared/config/apis';

const authInfo = async (): Promise<IUserInfo> =>
  fetcher(METHOD.GET, AUTH_APIS.INFO_API).then((res) => res.data);

const login = async (loginData: ISignin) =>
  fetcher(METHOD.POST, AUTH_APIS.SIGNIN_API, loginData);

const checkOut = async (checkOutData: ICheckOut) =>
  fetcher(METHOD.POST, AUTH_APIS.LOGOUT_API, checkOutData);

const nickChange = async (changeData: ChangeNick) =>
  fetcher(METHOD.PATCH, AUTH_APIS.NICK_CHNAGE_API, changeData);

const passwordChange = async (changePwData: IChangePw) =>
  fetcher(METHOD.PATCH, AUTH_APIS.PASSWORD_CHAGNE_API, changePwData);

const signup = async (signupData: ISignup) =>
  fetcher(METHOD.POST, AUTH_APIS.SIGNUP_API, signupData);

const tokenReissue = async () =>
  fetcher(METHOD.POST, AUTH_APIS.TOKKEN_REISSUE_API, {
    access: Cookies.get(TOKEN_KYES.ACCESS_TOKEN),
    refresh: Cookies.get(TOKEN_KYES.REFRESH_TOKEN),
  });

export {
  authInfo,
  login,
  checkOut,
  nickChange,
  passwordChange,
  signup,
  tokenReissue,
};
