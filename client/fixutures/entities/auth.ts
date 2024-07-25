import { IResponseSignin, ISignin, ISignup } from '@/src/entities/auth/type';

const signUpDate: ISignup = {
  loginId: 'testId',
  password: 'test',
  passwordCheck: 'test',
  email: 'test@test.com',
  nickname: 'test',
};

const signinData: ISignin = {
  loginId: 'test@example.com',
  password: 'password',
};
const signinResponse: IResponseSignin = {
  access: 'access_token',
  refresh: 'refresh_token',
  userId: 'user_id',
};

const userinfoResponse = {
  nickname: 'testeer',
  role: 'USER',
};

const changePassword = {
  nowPassword: 'test',
  changePassword: 'newTest',
  changePasswordCheck: 'newTest',
};

export {
  signUpDate,
  signinData,
  signinResponse,
  userinfoResponse,
  changePassword,
};
