import { useRouter } from 'next/router';

import { useAuth } from '@/src/entities/auth';

import { PROTECTED_ROUTES } from '../consts/routes';
import ProtectedPage from './protected/ProtectedPage';

type Props = {
  children: React.ReactNode;
};

/** 페이지 권한을 인가하는 역할 */
export default function AuthGuard({ children }: Props) {
  const isVerifiedToken = useAuth();
  const router = useRouter();

  const isProtectedPage = Object.values(PROTECTED_ROUTES).some((pattern) =>
    pattern.test(router.asPath));

  if (!isVerifiedToken && isProtectedPage) {
    return <ProtectedPage />;
  }

  return <div>{children}</div>;
}
