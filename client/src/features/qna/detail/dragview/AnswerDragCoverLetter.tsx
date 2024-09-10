import styled from 'styled-components';

import { boardQueries } from '@/src/entities/qnaboard';

import { S } from '@/src/features/qna/common';

import { useDragCorrection } from '@/src/shared/hooks';

import AnswerDragItem from './AnswerDragItem';

/** 드래그 첨삭 기능을 가진 자소서 View */
type AnswerProps = {
  boardId: number;
};

function AnswerDragCoverLetter({ boardId }: AnswerProps) {
  const {
    handleCorrection, selectedText, removeCorrection,
  } = useDragCorrection();

  const { data: boardList } = boardQueries.useFetchBoardDetail(boardId);

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

export default AnswerDragCoverLetter;

const Container = styled(S.container)`
  width: 100%;
  overflow: hidden;
`;
