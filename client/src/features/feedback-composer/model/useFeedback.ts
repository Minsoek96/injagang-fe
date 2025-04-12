import {
  useState, useCallback, useRef, useMemo,
} from 'react';

import { useCorrectionStore } from '@/src/entities/qnaboard';
import { feedbackMutation } from '@/src/entities/feedback';

import { useModal } from '@/src/shared/hooks';
import { MODAL_MESSAGES } from '@/src/shared/const';

const useFeedBack = () => {
  const [feedbackContent, setFeedbackContent] = useState<string>('');
  const textRef = useRef<HTMLTextAreaElement>(null);
  const { setModal } = useModal();

  const correction = useCorrectionStore((state) => state.correction);
  const initCorrection = useCorrectionStore((state) => state.initCorrection);

  const { mutate: writeFeedBack } = feedbackMutation.useWriteFeed();

  const CORRECTION_MIN = feedbackContent.trim().length < 30;
  const EMPTY_CORRECTION = correction.targetAnswer === '';

  // Warning 모달
  const handleWarning = useCallback((message: string) => {
    setModal({
      title: MODAL_MESSAGES.WARNING,
      message,
    });
  }, []);

  // 텍스트를 포커싱 하는 함수
  const focusTextArea = useCallback(() => {
    setTimeout(() => {
      textRef.current?.focus();
    }, 1000);
  }, []);

  const correctionClear = useCallback(() => {
    setFeedbackContent('');
    textRef.current?.focus();
  }, []);

  // 검증 규칙과 각 규칙에 따라 수행할 작업 정의
  const correctionRules = useMemo(() => [
    {
      rule: EMPTY_CORRECTION,
      modal: () => handleWarning('첨삭 내용을 등록해주세요.'),
      action: () => {},
    },
    {
      rule: CORRECTION_MIN,
      modal: () => handleWarning('피드백은 30자 이상 작성해주세요.'),
      action: () => focusTextArea(),
    },
  ], [EMPTY_CORRECTION, CORRECTION_MIN, handleWarning, focusTextArea]);

  // 선택된 규칙을 검증하는 함수
  const correctionValidation = useCallback(() => {
    const isValid = correctionRules.some((target) => {
      if (target.rule) {
        target.action();
        target.modal();
        return true;
      }
      return false;
    });
    return isValid;
  }, [correctionRules]);

  const handleSubmit = useCallback(() => {
    const isValid = correctionValidation();
    if (isValid) return;

    const formatData = {
      qnaId: correction.targetQuestionIndex,
      feedbackTarget: correction.targetAnswer,
      feedbackContent,
    };

    writeFeedBack(formatData);
    initCorrection();
    correctionClear();
  }, [CORRECTION_MIN, EMPTY_CORRECTION, correction, feedbackContent]);

  const handleChangeFeedBack = useCallback((feedBackText: string) => {
    setFeedbackContent(feedBackText);
  }, []);

  return {
    textRef,
    feedbackContent,
    setFeedbackContent,
    selectedCorrection: correction,
    handleChangeFeedBack,
    handleSubmit,
    correctionClear,
  };
};

export default useFeedBack;
