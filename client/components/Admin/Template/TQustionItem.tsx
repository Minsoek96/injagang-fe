import { BaseArea } from '@/src/shared/components/textarea';

import { forwardRef, memo } from 'react';

import styled from 'styled-components';

interface TQuestionItemProps {
  index: number;
  question: string;
  onChange: (index: number, value: string) => void;
}

const TQuestionItem = forwardRef<HTMLTextAreaElement, TQuestionItemProps>(
  ({ index, question, onChange }, ref) => (
    <QuestionItem>
      {index + 1}
      . 질문:
      <BaseArea
        ref={ref}
        value={question}
        onChange={(e) => onChange(index, e.target.value)}
        placeholder="질문을 입력해주세요"
      />
    </QuestionItem>
  ),
);

TQuestionItem.displayName = 'TQuestionItem';

export default memo(TQuestionItem);

const QuestionItem = styled.div`
  width: 80%;
  height: 120px;
  margin: auto 35px;
  margin-bottom: 45px;
`;
