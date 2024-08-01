import {
  memo, useEffect, useRef, useState,
} from 'react';

import styled from 'styled-components';

import { BiX } from 'react-icons/bi';

import { HideSvg, ResizeableTextarea } from '@/src/shared/components';
import { useDebounce } from '@/src/shared/hooks';
import { styleMixin, V } from '@/src/shared/styles';
import { coverLetterType } from '@/src/entities/coverLetter';

interface CoverLetterQuestionItemsProps {
  item: coverLetterType.IReadQnaList;
  onDelete: (targetID: string | number) => void;
  onUpdate: (
    targetID: string | number,
    newQuestion: string,
    newAnswer: string
  ) => void;
}

function CoverLetterQuestionItems({
  item,
  onDelete,
  onUpdate,
}: CoverLetterQuestionItemsProps) {
  const questionRef = useRef<HTMLTextAreaElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);
  const [question, setQuestion] = useState(item.question);
  const [answer, setAnswer] = useState(item.answer);

  const deQuestion = useDebounce(question, 300);
  const deAnswer = useDebounce(answer, 300);

  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.focus();
    }
  }, []);

  useEffect(() => {
    onUpdate(item.qnaId, deQuestion, deAnswer);
  }, [deQuestion, deAnswer, item.qnaId]);

  return (
    <CoverLetterQuestionItemsContainer>
      <HideSvg
        label="삭제"
        Logo={<BiX />}
        onClick={() => onDelete(item.qnaId)}
        sx={{
          position: 'absolute',
          right: 2,
          top: 2,
          fontSize: '2em',
        }}
      />
      <ResizeableTextarea
        ref={questionRef}
        text={question}
        setText={setQuestion}
        placeholder="자소서 질문을 작성해주세요."
        maxSize={10}
        sx={{ resize: 'vertical' }}
      />
      <ResizeableTextarea
        ref={answerRef}
        text={answer}
        setText={setAnswer}
        placeholder="내용을 작성해주세요."
        maxSize={30}
        sx={{ minHeight: '20rem', resize: 'vertical' }}
      />
      {`글자수 : ${answer.length}/500`}
    </CoverLetterQuestionItemsContainer>
  );
}

export default memo(CoverLetterQuestionItems);

const CoverLetterQuestionItemsContainer = styled.div`
  ${styleMixin.Column()}
  position: relative;
  width: 100%;
  padding: 2.5em 0.8em 1em 0.8em;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  min-height: 25rem;
  border-radius: 8px;
  box-shadow: ${V.boxShadow3};
  margin: 2.5rem auto;
`;
