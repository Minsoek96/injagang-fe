import { useState, useCallback } from 'react';

import { useRouter } from 'next/router';

import { v4 as uuid4 } from 'uuid';

import runValidationChecks from '@/util/runValidationChecks';
import { ERROR_MESSAGES } from '@/constants';
import { useWriteCoverLetter } from '@/apis/coverLetter/mutations';
import useModal from '@/hooks/useModal';

type QnaListType = {
  question: string;
  answer: string;
  qnaId: string | number;
};

/** 자소서를 생성와 관련된 로직 */

const useCoverLetterCreatorLogic = () => {
  const { mutate: writeCoverLetter } = useWriteCoverLetter();
  const [coverLetterTitle, setCoverLetterTitle] = useState<string>('');
  const [qnaList, setQnAList] = useState<QnaListType[]>([]);
  const { setModal } = useModal();
  const router = useRouter();

  const MIN_QUESTIONS = 1;
  const MAX_QUESTIONS = 5;

  const coverLetterMinLength = qnaList.length <= MIN_QUESTIONS;
  const coverLetterMaxLength = qnaList.length >= MAX_QUESTIONS;

  /** 유저가 폼을 추가하는 룰을 관리 */
  const addQnAList = useCallback(() => {
    if (coverLetterMaxLength) {
      setModal({
        contents: {
          title: 'Warring',
          message: `질문문항은 최대 ${MAX_QUESTIONS}개 제한입니다.`,
        },
      });
      return;
    }
    const newID = uuid4();
    setQnAList((prev) => [...prev, { question: '', answer: '', qnaId: newID }]);
  }, [qnaList]);

  /** 유저가 추가 폼을 삭제시 관리 */
  const deleteQnAList = useCallback(
    (targetID: string | number) => {
      if (coverLetterMinLength) return;
      const filterItem = qnaList.filter((qna) => qna.qnaId !== targetID);
      setQnAList(filterItem);
    },
    [qnaList],
  );

  /** 유저가 변경하는 폼을 체크 */
  const changeQnAList = useCallback(
    (targetID: string | number, newQuestion: string, newAnswer: string) => {
      setQnAList((prev) =>
        prev.map((qna) =>
          (qna.qnaId === targetID
            ? { ...qna, question: newQuestion, answer: newAnswer }
            : { ...qna })));
    },
    [qnaList],
  );

  const 자기소개서작성규칙 = [
    {
      check: () => coverLetterTitle === '',
      message: ERROR_MESSAGES.EMPTY_TITLE,
    },
    {
      check: () => qnaList.length < 1,
      message: ERROR_MESSAGES.MINIMUM_QNA,
    },
    {
      check: () => qnaList.some((q) => q.answer === ''),
      message: ERROR_MESSAGES.EMPTY_ANSWER,
    },
  ];

  /** 최종 관리자 룰을 검증 후 자기소개서 추가 요청 */
  const handleDispatch = useCallback(() => {
    const isWarringMsg = runValidationChecks(자기소개서작성규칙);
    if (isWarringMsg) {
      setModal({
        contents: {
          title: 'Warring',
          message: isWarringMsg,
        },
      });
      return;
    }

    const formatQnAList = qnaList.map((qna) => ({
      question: qna.question,
      answer: qna.answer,
    }));

    const qnaListForSubmission = {
      title: coverLetterTitle,
      owner: true,
      qnaList: formatQnAList,
    };

    writeCoverLetter(qnaListForSubmission);
    router.push('/coverLetter');
  }, [qnaList, coverLetterTitle]);

  return {
    setQnAList,
    qnaList,
    addQnAList,
    changeQnAList,
    deleteQnAList,
    handleDispatch,
    setCoverLetterTitle,
    coverLetterTitle,
  };
};

export default useCoverLetterCreatorLogic;
