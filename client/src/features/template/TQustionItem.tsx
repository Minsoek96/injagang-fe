import { ResizeableTextarea } from '@/src/shared/components/textarea';
import { useDebounce } from '@/src/shared/hooks';
import { styleMixin } from '@/src/shared/styles';

import {
  forwardRef, memo, useEffect, useState,
} from 'react';

import styled from 'styled-components';

interface TQuestionItemProps {
  index: number;
  question: string;
  onChange: (index: number, value: string) => void;
}

const TQuestionItem = forwardRef<HTMLTextAreaElement, TQuestionItemProps>(
  ({ index, question, onChange }, ref) => {
    const [text, setText] = useState(question);
    const debounceText = useDebounce(text, 1000);

    useEffect(() => {
      onChange(index, debounceText);
    }, [debounceText, index, onChange]);

    return (
      <QuestionItem>
        {index + 1}
        . 질문:
        <ResizeableTextarea
          ref={ref}
          text={text}
          setText={setText}
          placeholder="질문을 입력해주세요"
          maxSize={10}
        />
      </QuestionItem>
    );
  },
);

TQuestionItem.displayName = 'TQuestionItem';

export default memo(TQuestionItem);

const QuestionItem = styled.div`
  ${styleMixin.Column('flex-start', 'flex-start')}
  width: 80%;
  height: 120px;
  margin: auto 35px;
  margin-bottom: 45px;

  font-size: 1.5rem;
  > textarea {
    margin-top: 1rem;
    background-color: white;
    color: black;

    &:focus{
      border : 0.3em solid #6B7A90;
    }
  }
`;
