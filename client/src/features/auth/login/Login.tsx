import LoginForm from '@/src/features/auth/login/LoginForm';

import { authMutations, authType } from '@/src/entities/auth';

import { usePageRouter } from '@/src/shared/hooks';

function Login() {
  const { mutate: authenTicate } = authMutations.useFetchSignin();
  const { moveSignupPage } = usePageRouter();

  const labels = [
    { key: 'loginId', label: '아이디', type: 'text' },
    { key: 'password', label: '비밀번호', type: 'password' },
  ];

  const handleSubmit = (data: authType.ISignin) => {
    authenTicate(data);
  };

  return (
    <LoginForm
      onSubmit={handleSubmit}
      labels={labels}
      navigateToSignUp={moveSignupPage}
    />
  );
}

export default Login;
