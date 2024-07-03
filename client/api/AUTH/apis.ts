import Cookies from "js-cookie";

import { fetcher, METHOD } from "../client";
import { AUTH_APIS } from "../config";

import {
  ISignin,
  ISignup,
  ICheckOut,
  ChangeNick,
  IChangePw,
  IUserInfo,
} from "@/types/auth/AuthType";

const authInfo = async (): Promise<IUserInfo> => {
  return fetcher(METHOD.GET, AUTH_APIS.INFO_API)
    .then(res => res.data)
    .catch(error => console.error(error));
};

const login = async (loginData: ISignin) => {
  return fetcher(METHOD.POST, AUTH_APIS.SIGNIN_API, loginData);
};

const checkOut = async (checkOutData: ICheckOut) => {
  return fetcher(METHOD.POST, AUTH_APIS.LOGOUT_API, checkOutData);
};

const nickChange = async (changeData: ChangeNick) => {
  return fetcher(METHOD.PATCH, AUTH_APIS.NICK_CHNAGE_API, changeData);
};

const passwordChange = async (changePwData: IChangePw) => {
  return fetcher(METHOD.PATCH, AUTH_APIS.PASSWORD_CHAGNE_API, changePwData);
};

const signup = async (signupData: ISignup) => {
  return fetcher(METHOD.POST, AUTH_APIS.SIGNUP_API, signupData);
};

const tokenReissue = async () => {
  return fetcher(METHOD.POST, AUTH_APIS.TOKKEN_REISSUE_API, {
    access: Cookies.get("accessToken"),
    refresh: Cookies.get("refreshToken"),
  });
};

export {
  authInfo,
  login,
  checkOut,
  nickChange,
  passwordChange,
  signup,
  tokenReissue,
};
