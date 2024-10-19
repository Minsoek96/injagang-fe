import { boardType, useCorrectionStore } from '@/src/entities/qnaboard';
import { ERROR_MESSAGES, MODAL_MESSAGES } from '@/src/shared/const';

import { useModal } from '@/src/shared/hooks';

import { useCallback, useState } from 'react';

export const initialState: boardType.SelectedText = {
  dragTitleId: 0,
  targetId: 0,
  selectedText: '',
  start: 0,
  end: 0,
  added: false,
};

const useDragCorrection = () => {
  const { setModal } = useModal();

  const { setCorrection, initCorrection } = useCorrectionStore();

  const [selectedText, setSelectedText] = useState<boardType.SelectedText>(initialState);

  // 선택된 텍스트가 원본 텍스트에 포함되어있는지 검증하는 함수
  const validateSelectedText = (originText: string) => {
    const selection = window.getSelection();
    const selected = selection?.toString();
    const check = originText.includes(selected || '!&!');
    return check ? selected : check;
  };

  /** 첨삭 내용을 전달 받는 함수 */
  const handleCorrection = useCallback(
    (dragTitleId: number, targetId: number, originText: string) => {
      const isSelected = selectedText.added;
      if (isSelected) {
        showWarring();
        return;
      }

      const selectedCorrection = validateSelectedText(originText);
      selectedCorrection
        && changeCorrection(selectedCorrection, dragTitleId, targetId);
    },
    [selectedText],
  );

  // 첨삭을 반영하는 함수
  const changeCorrection = useCallback(
    (newSelectedText: string, dragTitleId: number, targetId: number) => {
      const range = window.getSelection()?.getRangeAt(0);
      const start = range?.startOffset || 0;
      const end = range?.endOffset || 0;

      setSelectedText({
        dragTitleId,
        targetId,
        selectedText: newSelectedText,
        start,
        end,
        added: true,
      });

      setCorrection({
        targetQuestion: dragTitleId,
        targetAnswer: newSelectedText,
        targetQuestionIndex: targetId,
      });
    },
    [],
  );

  // 모달에 경고메시지를 등록하는 함수
  const showWarring = useCallback(() => {
    setModal({
      contents: {
        title: MODAL_MESSAGES.WARNING,
        message: ERROR_MESSAGES.DUPLICATION_TEXT,
      },
    });
  }, []);

  // 첨삭 삭제를 처리하는 함수
  const removeCorrection = useCallback(() => {
    setSelectedText(initialState);
    initCorrection();
  }, []);

  return {
    handleCorrection,
    removeCorrection,
    selectedText,
  };
};

export default useDragCorrection;
