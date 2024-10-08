import { useCallback } from 'react';

import { useRouter } from 'next/router';

export default function usePageRouter() {
  const router = useRouter();
  /** 자소서 수정 페이지 이동 */
  const moveCoverLetterEditPage = useCallback((essayId: number) => {
    router.push({
      pathname: `/coverLetter/${essayId}/edit`,
    });
  }, []);
  /** 자소서 메인 페이지 이동 */
  const moveCoverLetterMainPage = useCallback(() => {
    router.push({
      pathname: '/coverLetter',
    });
  }, []);

  return {
    moveCoverLetterEditPage,
    moveCoverLetterMainPage,
  };
}
