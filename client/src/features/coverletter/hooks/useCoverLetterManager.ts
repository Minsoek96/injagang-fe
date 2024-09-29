import { useCallback } from 'react';

import { useRouter } from 'next/router';
import {
  coverLetterType,
} from '@/src/entities/coverLetter';
import {
  useDeleteCoverLetter,
  useReviseCoverLetter,
} from '@/src/entities/coverLetter/mutations';

/** 유저가 선택한 자소서의 상태를 반영하고 업데이트를 위한 함수 */
const useCoverLetterManager = () => {
  const router = useRouter();

  const { mutate: reviseCoverLetter } = useReviseCoverLetter();
  const { mutate: removeCoverLetter } = useDeleteCoverLetter();

  /** 자소서 업데이트 반영 */
  const changeCoverLetter = useCallback(
    (essayId: number, title: string, qnaList: coverLetterType.IReadQnaList[]) => {
      const resetData = {
        title,
        qnaList: qnaList.map((qna) => ({
          question: qna.question,
          answer: qna.answer,
        })),
      };
      reviseCoverLetter({ id: essayId, data: resetData });
      router.push('/coverLetter');
    },
    [],
  );

  /** 자소서 삭제 반영 */
  const deleteCoverLetter = useCallback((targetID: number) => {
    removeCoverLetter(targetID);
    router.push('/coverLetter');
  }, []);

  return {
    changeCoverLetter,
    deleteCoverLetter,
  };
};

export default useCoverLetterManager;
