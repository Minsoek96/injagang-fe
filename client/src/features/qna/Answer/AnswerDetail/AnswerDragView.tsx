import { useEffect } from 'react';

import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';
import { boardQueries, useCorrectionStore } from '@/src/entities/qnaboard';
import AnswerDragItem from './AnswerDragItem';

import useDragCorrection from '../../hooks/useDragCorrection';

/** 드래그 첨삭 기능을 가진 자소서 View */
type AnswerProps = {
  boardId: number;
};

function AnswerDragView({ boardId }: AnswerProps) {
  const {
    handleCorrection, selectedText, removeCorrection,
  } = useDragCorrection();
  const { setCorrection } = useCorrectionStore();
  const { data: boardList } = boardQueries.useFetchBoardDetail(boardId);

  useEffect(() => {
    handleApply();
  }, [selectedText]);

  /** 드래그 첨삭 적용 */
  const handleApply = () => {
    setCorrection({
      targetQuestion: selectedText.dragTitleId,
      targetAnswer: selectedText.selectedText,
      targetQuestionIndex: selectedText.targetId,
    });
  };

  return (
    <AnswerDragStyle>
      <h2 className="essay_title">{boardList?.essayTitle}</h2>
      {boardList?.qnaList
        && boardList.qnaList.map((list, idx) => (
          <AnswerDragItem
            key={list.qnaId}
            onSelect={handleCorrection}
            onRemove={removeCorrection}
            index={idx}
            selectedText={selectedText}
            list={list}
          />
        ))}
    </AnswerDragStyle>
  );
}

export default AnswerDragView;

const AnswerDragStyle = styled.div`
  ${styleMixin.ScrollBar}
  background-color: #191919;
  color: #dad6d1;
  padding: 15px;
  height: 100vh;
  width: 100%;
  word-break: break-all;
  overflow-x: hidden;
  .essay_title {
    text-align: center;
  }
`;
