/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';

import { boardType } from '@/src/entities/qnaboard';
import { S } from '@/src/features/qna/style';

import { ISelectedText } from '../hooks/useDragCorrection';
import DraggedAnswer from './DraggedAnswer';

interface AnswerDragItemProps {
  onSelect: (dragTitleId: number, targetId: number) => void;
  onRemove: () => void;
  selectedText: ISelectedText;
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
  const [selectedColor] = useState('#e69a0def');
  const { selectedText: preSelectedText } = selectedText;
  const { qnaId, question, answer } = list;

  const isSelected = selectedText.added && selectedText.targetId === list.qnaId;
  const 시작점부터타겟까지문장 = list.answer.substring(0, selectedText.start);
  const 타겟부터끝나는지점문장 = list.answer.substring(
    selectedText.end,
    answer.length,
  );

  return (
    <S.detailItmes>
      <S.questionContainer>
        <h4 className="essay_question">
          <span>질문:</span>
          {' '}
          {question}
        </h4>
      </S.questionContainer>
      <S.answerContainer>
        <span>답변</span>
        <p
          className="essay_answer"
          onMouseUp={() => onSelect(index + 1, qnaId)}
        >
          {isSelected ? (
            <DraggedAnswer
              startText={시작점부터타겟까지문장}
              selectedText={preSelectedText}
              endText={타겟부터끝나는지점문장}
              selectedColor={selectedColor}
              onRemove={onRemove}
            />
          ) : (
            answer
          )}
        </p>
      </S.answerContainer>
    </S.detailItmes>
  );
}

export default AnswerDragItem;
