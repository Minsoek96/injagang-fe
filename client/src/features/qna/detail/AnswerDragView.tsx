import { useEffect } from 'react';

import { boardQueries, useCorrectionStore } from '@/src/entities/qnaboard';

import { S } from '@/src/features/qna/style';

import styled from 'styled-components';
import AnswerDragItem from './AnswerDragItem';

import useDragCorrection from '../hooks/useDragCorrection';

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
    <Container>
      <S.mainTitle>{boardList?.essayTitle}</S.mainTitle>
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
    </Container>
  );
}

export default AnswerDragView;

const Container = styled(S.container)`
  overflow: hidden;
`;
