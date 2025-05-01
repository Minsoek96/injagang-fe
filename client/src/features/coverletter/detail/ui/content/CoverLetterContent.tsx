import { styled } from 'styled-components';

import { styleMixin, V } from '@/src/shared/styles';

type Props ={
    index: number;
    question: string;
    answer: string;
}

export default function CoverLetterContent({ index, question, answer }:Props) {
  const questionNumber = `Q${index + 1}`;
  return (
    <QuestionSection>
      <QuestionNumber>
        {questionNumber}
      </QuestionNumber>

      <QuestionContent>
        <QuestionText>{question}</QuestionText>
        <AnswerText>{answer}</AnswerText>
      </QuestionContent>
    </QuestionSection>
  );
}

const QuestionSection = styled.div`
  position: relative;
  padding-left: 3rem;
`;

const QuestionNumber = styled.div`
  position: absolute;
  ${styleMixin.Flex()}
  left: -0.5rem;
  top: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.signatureColor};
  color: white;
  font-weight: bold;
  font-family: ${V.serif};
  font-size: 1.4rem;
`;

const QuestionContent = styled.div`
  border-left: 2px solid ${(props) => `${props.theme.colors.signatureColor}2A`};
  padding-left: 1.5rem;
`;

const QuestionText = styled.h2`
  font-family: ${V.serif};
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.colors.signatureColor};
`;

const AnswerText = styled.p`
  font-family: ${V.serif};
  font-size: 1.4rem;
  ${styleMixin.ReadableText};
`;
