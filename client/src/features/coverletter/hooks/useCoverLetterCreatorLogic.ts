import { useCallback, useReducer } from 'react';

import { useRouter } from 'next/router';

import { v4 as uuid4 } from 'uuid';

import { runValidationChecks } from '@/src/shared/utils';
import { ERROR_MESSAGES } from '@/src/shared/const';
import { useWriteCoverLetter } from '@/src/entities/coverLetter/mutations';
import { useModal } from '@/src/shared/hooks';
import {
  qnaReducer,
  ADD_QNA,
  CHANGE_QNA,
  DELETE_QNA,
  initialState,
  QnaItem,
} from '@/src/features/coverletter/common';

/** 자소서를 생성와 관련된 로직 */

const useCoverLetterCreatorLogic = () => {
  const router = useRouter();
  const { mutate: writeCoverLetter } = useWriteCoverLetter();
  const [state, dispatch] = useReducer(qnaReducer, initialState);
  const { setModal } = useModal();

  const MIN_QUESTIONS = 1;
  const MAX_QUESTIONS = 5;

  const coverLetterMinLength = state.qnaList.length <= MIN_QUESTIONS;
  const coverLetterMaxLength = state.qnaList.length >= MAX_QUESTIONS;

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
    dispatch({
      type: ADD_QNA,
      payload: { question: '', answer: '', qnaId: newID },
    });
  }, [state.qnaList]);

  /** 유저가 추가 폼을 삭제시 관리 */
  const deleteQnAList = useCallback(
    (targetID: string | number) => {
      if (coverLetterMinLength) return;
      dispatch({ type: DELETE_QNA, payload: targetID });
    },
    [state.qnaList],
  );

  /** 유저가 변경하는 폼을 체크 */
  const changeQnAList = useCallback(
    (targetID: string | number, newQuestion: string, newAnswer: string) => {
      dispatch({
        type: CHANGE_QNA,
        payload: { qnaId: targetID, question: newQuestion, answer: newAnswer },
      });
    },
    [state.qnaList],
  );

  const 자기소개서작성규칙 = [
    {
      check: () => state.coverLetterTitle === '',
      message: ERROR_MESSAGES.EMPTY_TITLE,
    },
    {
      check: () => state.qnaList.length < 1,
      message: ERROR_MESSAGES.MINIMUM_QNA,
    },
    {
      check: () => state.qnaList.some((q) => q.answer === ''),
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

    const formatQnAList = state.qnaList.map((qna) => ({
      question: qna.question,
      answer: qna.answer,
    }));

    const qnaListForSubmission = {
      title: state.coverLetterTitle,
      owner: true,
      qnaList: formatQnAList,
    };

    writeCoverLetter(qnaListForSubmission);
    router.push('/coverLetter');
  }, [state]);

  return {
    setCoverLetterTitle: (title: string) =>
      dispatch({ type: 'SET_TITLE', payload: title }),
    setQnAList: (list: QnaItem[]) =>
      dispatch({ type: 'SET_QNA_LIST', payload: list }),
    qnaList: state.qnaList,
    addQnAList,
    changeQnAList,
    deleteQnAList,
    handleDispatch,
    coverLetterTitle: state.coverLetterTitle,
  };
};

export default useCoverLetterCreatorLogic;
