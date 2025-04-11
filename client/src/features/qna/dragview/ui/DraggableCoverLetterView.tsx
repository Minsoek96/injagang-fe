import styled from 'styled-components';

import { boardQueries, S } from '@/src/entities/qnaboard';

import { DraggableCoverLetter } from './draggable-answer';

import { useDragCorrection } from '../model';

/**
 * 드래그 기능을 가진 자소서 뷰
 *
 * 첨부된 자소서에 드래그 기능을 부여하여
 * 사용자가 텍스트를 선택하고 첨삭할 수 있게 해주는 컴포넌트
 */
function DraggableCoverLetterView() {
  const {
    handleCorrection, selectedText, removeCorrection,
  } = useDragCorrection();

  const { data: boardList } = boardQueries.useFetchCurrentBoardDetail();

  return (
    <Container>
      <S.mainTitle>{boardList?.essayTitle}</S.mainTitle>
      {boardList?.qnaList
        && boardList.qnaList.map((list) => (
          <DraggableCoverLetter
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

export default DraggableCoverLetterView;

const Container = styled(S.container)`
  width: 100%;
  overflow: hidden;
  `;

// useWhyDidYouRender('DraggableCoverLetter', {
//   selectedText, boardList, removeCorrection, handleCorrection,
// });
