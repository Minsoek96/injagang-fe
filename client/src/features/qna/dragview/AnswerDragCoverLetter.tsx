import styled from 'styled-components';

import { boardQueries, S } from '@/src/entities/qnaboard';

import AnswerDragItem from './AnswerDragItem';

import useDragCorrection from './model/useDragCorrection';

/** AnswerDragCoverLetter 드래그 자소서 메인 */
function AnswerDragCoverLetter() {
  const {
    handleCorrection, selectedText, removeCorrection,
  } = useDragCorrection();

  const { data: boardList } = boardQueries.useFetchCurrentBoardDetail();

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
