import { memo } from 'react';

import { boardType } from '@/src/entities/qnaboard';
import { S, type } from '@/src/features/qna/common';

import DraggedAnswer from './DraggedAnswer';

interface AnswerDragItemProps {
  onSelect: (dragTitleId: number, targetId: number, originText: string) => void;
  onRemove: () => void;
  selectedText: type.SelectedText;
  list: boardType.IQnaList;
  index: number;
}

function AnswerDragItem({
  list,
  onSelect,
  onRemove,
  selectedText,
  index,
}: AnswerDragItemProps) {
  const { selectedText: selectedCorrection } = selectedText;
  const { qnaId, question, answer } = list;

  const isTargetAnswer = selectedText.targetId === list.qnaId;
  const 시작점부터타겟까지문장 = list.answer.substring(0, selectedText.start);
  const 타겟부터끝나는지점문장 = list.answer.substring(
    selectedText.end,
    answer.length,
  );

  return (
    <S.detailItmes>
      <S.questionContainer>
        <span>질문: </span>
        {question}
      </S.questionContainer>
      <S.answerContainer>
        <span>답변</span>
        {selectedCorrection && isTargetAnswer ? (
          <DraggedAnswer
            startText={시작점부터타겟까지문장}
            selectedText={selectedCorrection}
            endText={타겟부터끝나는지점문장}
            onRemove={onRemove}
          />
        ) : (
          <div onMouseUp={() => onSelect(index + 1, qnaId, answer)}>
            <p>{answer}</p>
          </div>
        )}
      </S.answerContainer>
    </S.detailItmes>
  );
}

export default memo(AnswerDragItem);
