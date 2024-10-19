import styled from 'styled-components';

import { S } from '@/src/entities/coverLetter';
import { boardQueries } from '@/src/entities/qnaboard';

import AnswerDragItem from './AnswerDragItem';

import useDragCorrection from './model/useDragCorrection';

/** AnswerDragCoverLetter 드래그 자소서 메인
 *
 * @param boardId - 보드 아이디
 */
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
        && boardList.qnaList.map((list) => (
          <AnswerDragItem
            key={list.qnaId}
            onSelect={handleCorrection}
            onRemove={removeCorrection}
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
