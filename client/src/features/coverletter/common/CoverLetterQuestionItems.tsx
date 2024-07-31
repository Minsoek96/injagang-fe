import { memo, useState } from 'react';

import styled from 'styled-components';

import { BiX } from 'react-icons/bi';

import { styleMixin, V } from '@/src/shared/styles';
import { coverLetterType } from '@/src/entities/coverLetter';
import { HideSvg } from '@/src/shared/components';

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
  const [question, setQuestion] = useState(item.question);
  const [answer, setAnswer] = useState(item.answer);

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
      <QuestionTextArea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <AnswerTextArea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onBlur={() => onUpdate(item.qnaId, question, answer)}
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
  padding: 2.5em .8em 1em .8em;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  min-height: 25rem;
  border-radius: 8px;
  box-shadow: ${V.boxShadow3};
  margin: 2.5rem auto;
`;

const QuestionTextArea = styled.textarea`
  font-size: 1.5rem;

  box-sizing: border-box;
  width: 100%;
  min-height: 3rem;
  max-height: 20rem;
  resize: vertical;

  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.textArea};
  color: ${(props) => props.theme.colors.text};

  padding: ${V.mdPadding};
  ${styleMixin.ScrollBar};
`;

const AnswerTextArea = styled.textarea`
  resize: vertical;
  font-family: "Malgun Gothic", sans-serif;
  font-weight: normal;
  width: 100%;
  line-height: 2;
  height: 30rem;
  border-radius: 5px;
  margin: 0.8rem auto;
  padding-block: .7em;
  padding-inline: 1em;
  background-color: ${(props) => props.theme.colors.textArea};
  color: ${(props) => props.theme.colors.text};
  ${styleMixin.ScrollBar}
`;
