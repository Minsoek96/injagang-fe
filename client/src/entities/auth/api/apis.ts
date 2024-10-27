import { fetcher, METHOD } from '@/src/shared/utils';

import { AUTH_APIS } from '@/src/shared/config/apis';
import {
  ISignin,
  ISignup,
  ICheckOut,
  ChangeNick,
  IChangePw,
  IUserInfo,
} from '@/src/entities/auth/model/type';

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

export {
  authInfo,
  login,
  checkOut,
  nickChange,
  passwordChange,
  signup,
};
