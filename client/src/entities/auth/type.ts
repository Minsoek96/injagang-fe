export interface ISignin {
  loginId: string;
  password: string;
}

export interface ICheckOut {
  access: string | undefined;
}

export type ChangeNick = {
  changeNickname: string;
};

export interface IChangePw {
  nowPassword: string;
  changePassword: string;
  changePasswordCheck: string;
}

export interface ISignup {
  loginId: string;
  password: string;
  passwordCheck: string;
  email: string;
  nickname: string;
}

export interface IResponseSignin {
  userId: string;
  access: string;
}

export type RoleType = 'USER' | 'ADMIN';

export interface IUserInfo {
  nickname: string;
  role: RoleType;
}
