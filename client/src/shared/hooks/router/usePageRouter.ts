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

  const moveCoverLetterCreatePage = useCallback(() => {
    router.push({
      pathname: '/coverLetter/new',
    });
  }, []);

  /** 게시판 상세 페이지 */
  const moveBoardDetailPage = useCallback((boardId: number) => {
    router.replace(`/qna/detail/${boardId}`);
  }, []);

  /** 게시판 이동 페이지 */
  const moveBoardMainPage = useCallback(() => {
    router.replace({ pathname: '/qna/list' });
  }, []);

  const moveBoardQuestionPage = useCallback(() => {
    router.push('/qna/question');
  }, []);

  const moveBoardEditPage = useCallback((boardId: number) => {
    router.replace(`/qna/edit/${boardId}`);
  }, []);

  /** 회원가입 페이지 이동 */
  const moveSignupPage = useCallback(() => {
    router.push({ pathname: '/join' });
  }, []);

  return {
    moveCoverLetterCreatePage,
    moveCoverLetterEditPage,
    moveCoverLetterMainPage,
    moveBoardEditPage,
    moveBoardDetailPage,
    moveBoardMainPage,
    moveBoardQuestionPage,
    moveSignupPage,
  };
}
