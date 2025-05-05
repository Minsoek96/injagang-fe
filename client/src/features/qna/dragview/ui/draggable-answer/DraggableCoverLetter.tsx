import { boardType, S } from '@/src/entities/qnaboard';

import { useCallback } from 'react';
import styled from 'styled-components';
import DraggableAnswerText from './DraggableAnswer';
import DraggedAnswer from './DraggedAnswer';

interface AnswerDragItemProps {
  onSelect: (targetId: number, originText: string) => void;
  onRemove: () => void;
  selectedText: boardType.SelectedText;
  list: boardType.IQnaList;
}

/** AnswerDragItem 드래그 가능한 질문
 *
 * @param list - 자소서 리스트
 * @param onSelect - 자소서 드래그 선택 함수
 * @param onRemove - 선택 드래그 상태 삭제
 * @param selectedText - 선택된 텍스트의 정보
 */
function DraggableCoverLetter({
  list,
  onSelect,
  onRemove,
  selectedText,
}: AnswerDragItemProps) {
  const { selectedText: selectedCorrection } = selectedText;
  const { qnaId, question, answer } = list;

  const isTargetAnswer = selectedText.targetId === list.qnaId;
  const 시작점부터타겟까지문장 = list.answer.substring(0, selectedText.start);
  const 타겟부터끝나는지점문장 = list.answer.substring(
    selectedText.end,
    answer.length,
  );
  const handleSelect = useCallback(() => {
    onSelect(qnaId, answer);
  }, [qnaId, answer, onSelect]);

  return (
    <S.detailItmes>
      <S.questionContainer>
        <span>질문: </span>
        {question}
      </S.questionContainer>
      <AnswerDragContainer>
        <span>답변: </span>
        {selectedCorrection && isTargetAnswer ? (
          <DraggedAnswer
            startText={시작점부터타겟까지문장}
            selectedText={selectedCorrection}
            endText={타겟부터끝나는지점문장}
            onRemove={onRemove}
          />
        ) : (
          <DraggableAnswerText answer={answer} onSelect={handleSelect} />
        )}
      </AnswerDragContainer>
    </S.detailItmes>
  );
}

export default DraggableCoverLetter;

const AnswerDragContainer = styled(S.answerContainer)`
  cursor: grab;

  p:active {
      cursor: grabbing;
    }
`;
