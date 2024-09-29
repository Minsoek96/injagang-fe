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

  return {
    moveCoverLetterEditPage,
  };
}
