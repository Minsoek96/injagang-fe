import { ERROR_MESSAGES, MODAL_MESSAGES } from '@/src/shared/const';

import { useModal } from '@/src/shared/hooks';

import { useState } from 'react';

export interface ISelectedText {
  dragTitleId: number;
  targetId: number;
  selectedText: string;
  start: number;
  end: number;
  added: boolean;
}

const useDragCorrection = () => {
  const { setModal } = useModal();
  const [selectedText, setSelectedText] = useState<ISelectedText>({
    dragTitleId: 0,
    targetId: 0,
    selectedText: '',
    start: 0,
    end: 0,
    added: false,
  });

  // TODO :  연속적인 if 제거
  const handleCorrection = (dragTitleId: number, targetId: number) => {
    const selected = window.getSelection()?.toString();
    const isSelected = selected !== '' && selectedText.added;
    if (selected) {
      if (isSelected) {
        showWarring();
      } else {
        changeCorrection(selected, dragTitleId, targetId);
      }
    }
  };

  const changeCorrection = (
    newSelectedText: string,
    dragTitleId: number,
    targetId: number,
  ) => {
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
  };

  const showWarring = () => {
    setModal({
      contents: {
        title: MODAL_MESSAGES.WARNING,
        message: ERROR_MESSAGES.DUPLICATION_TEXT,
      },
    });
  };

  const removeCorrection = () => {
    setSelectedText({
      dragTitleId: 0,
      targetId: 0,
      selectedText: '',
      start: 0,
      end: 0,
      added: false,
    });
  };

  return {
    handleCorrection,
    removeCorrection,
    selectedText,
    setModal,
  };
};

export default useDragCorrection;
