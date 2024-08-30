import ProtectedPage from '@/src/app/providers/ProtectedPage';
import { useAuth } from '@/src/shared/hooks';
import { useRouter } from 'next/router';

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
