import { useRouter } from 'next/router';

import LoginForm from '@/src/features/auth/login/LoginForm';
import { authMutations, authType } from '@/src/entities/auth';

function Login() {
  const { mutate: authenTicate } = authMutations.useFetchSignin();
  const router = useRouter();

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
      navigateToSignUp={() => router.push('/join')}
    />
  );
}

export default Login;
