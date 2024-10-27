import { IResponseSignin, ISignin, ISignup } from '@/src/entities/auth/model/type';

/** 샘플 회원가입 정보 */
const signUpDate: ISignup = {
  loginId: 'testId',
  password: 'test',
  passwordCheck: 'test',
  email: 'test@test.com',
  nickname: 'test',
};

/** 샘플 로그인 정보 */
const signinData: ISignin = {
  loginId: 'test@example.com',
  password: 'password',
};

/** API 반환 - 로그인 정보 */
const signinResponse: IResponseSignin = {
  access: 'access_token',
  userId: 'user_id',
};

/** API 반환 - 유저 정보 조회 */
const userinfoResponse = {
  nickname: 'testeer',
  role: 'USER',
};

/** 샘플 패스워드 전환 목록 */
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
