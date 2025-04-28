import { useCallback } from 'react';

import { useRouter } from 'next/router';
import {
  coverLetterType,

  coverLetterMutation,
} from '@/src/entities/coverLetter';

/** 유저가 선택한 자소서의 상태를 반영하고 업데이트를 위한 함수 */
const useCoverLetterManager = () => {
  const router = useRouter();
  const { mutate: reviseCoverLetter } = coverLetterMutation.useReviseCoverLetter();

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

  return {
    changeCoverLetter,
  };
};

export default useCoverLetterManager;
