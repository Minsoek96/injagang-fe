import { useRouter } from 'next/router';

import { useAuth } from '@/src/entities/auth';

import ProtectedPage from './ProtectedPage';

type Props = {
  children: React.ReactNode;
};

/** 페이지 권한을 인가하는 역할 */
export default function AuthGard({ children }: Props) {
  const isVerifiedToken = useAuth();
  const router = useRouter();

  const protectedPages = [
    /^\/coverLetter(?:\/.*)?$/,
    /^\/qna\/detail\/.*/,
    /^\/qna\/question/,
    /^\/profile\/.+/,
    /^\/myProfile/,
  ];

  const isProtectedPage = protectedPages.some((pattern) =>
    pattern.test(router.asPath));

  if (!isVerifiedToken && isProtectedPage) {
    return <ProtectedPage />;
  }

  return <div>{children}</div>;
}
