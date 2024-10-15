import SignUpForm from '@/src/features/auth/signup/SignUpForm';

import { authMutations, authType } from '@/src/entities/auth';

function SignUp() {
  const { mutate: confirmSignUp } = authMutations.useFetchSignup();

  const labels = [
    { key: 'loginId', label: '아이디', type: 'text' },
    { key: 'password', label: '비밀번호', type: 'password' },
    { key: 'passwordCheck', label: '비밀번호 확인', type: 'password' },
    { key: 'email', label: '이메일', type: 'email' },
    { key: 'nickname', label: '닉네임', type: 'text' },
  ];

  const handleSubmit = (data: authType.ISignup) => {
    confirmSignUp(data);
  };

  return (
    <SignUpForm onSubmit={handleSubmit} labels={labels} />
  );
}

export default SignUp;
