import { useState, useCallback, useRef, useEffect } from "react";

import useModal from "@/hooks/useModal";
import useFeedManager from "../hooks/useFeedManager";
import { useCorrectionStore } from "@/store/qna";

const useFeedBackLogic = () => {
  const [correctionText, setCorrectionText] = useState<string>("");
  const [isFeedBackClear, setIsFeedBackClear] = useState<boolean>(false);
  const [isViolation, setIsViolation] = useState<boolean>(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const { setModal, Modal } = useModal();

  const { correction, initCorrection } = useCorrectionStore();

  const { dispatchWriteFeedBack } = useFeedManager();
  const CORRECTION_MIN = correctionText.length < 30;
  const EMPTY_CORRECTION = correction.targetAnswer === "";

  const handleWarring = useCallback(() => {
    setModal({
      contents: {
        title: "경고",
        content: `Target질문을 선택해주세요.
          피드백은 30자이상 작성하세요. `,
      },
    });
  }, []);

  useEffect(() => {
    if (isFeedBackClear) {
      setCorrectionText("");
      textRef.current?.focus();
    }
    if (isViolation) {
      textRef.current?.focus();
    }
  }, [isFeedBackClear, isViolation]);

  const focusTextArea = useCallback(() => {
    setIsViolation(true);
    setTimeout(() => {
      setIsViolation(false);
    }, 30);
  }, []);

  const handleClear = useCallback(() => {
    setIsFeedBackClear(true);
    setTimeout(() => {
      setIsFeedBackClear(false);
    }, 10);
  }, []);

  const handleSubmit = useCallback(() => {
    if (CORRECTION_MIN || EMPTY_CORRECTION) {
      handleWarring();
      focusTextArea();
      return;
    }
    const formatData = {
      qnaId: correction.targetQuestionIndex,
      feedbackTarget: correction.targetAnswer,
      feedbackContent: correctionText,
    };
    dispatchWriteFeedBack(formatData);
    initCorrection();
    handleClear();
  }, [CORRECTION_MIN, EMPTY_CORRECTION, correction, correctionText]);

  const handleChangeFeedBack = useCallback((feedBackText: string) => {
    setCorrectionText(feedBackText);
  }, []);

  return {
    textRef,
    correctionText,
    selectedCorrection: correction,
    handleChangeFeedBack,
    handleSubmit,
    handleClear,
    Modal,
  };
};

export default useFeedBackLogic;
