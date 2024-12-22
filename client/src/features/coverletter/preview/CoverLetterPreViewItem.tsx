import styled from 'styled-components';
import { styleMixin, V } from '@/src/shared/styles';

function CoverLetterPreViewItem({
  idx,
  question,
}: {
  idx: number;
  question: string;
}) {
  return (
    <QuestionContainer>
      <QuestionNumber>{idx + 1}</QuestionNumber>
      <QuestionTitle>{question}</QuestionTitle>
    </QuestionContainer>
  );
}

export default CoverLetterPreViewItem;

const QuestionContainer = styled.li`
  ${styleMixin.Flex('flex-start', 'flex-start')}
  width: 100%;
  padding: 1.6rem;
  gap: 1.2rem;
  background: ${props => props.theme.colors.primary};
  border-bottom: 1px solid ${props => props.theme.colors.mainLine};
  border-top-right-radius: 1.2rem;
  border-top-left-radius: 1.2rem;
  @media screen and (max-width: ${V.mediaMobile}) {
    padding: 1rem;
  }
`;

const QuestionNumber = styled.span`
  ${styleMixin.Flex()}
  min-width: 2.4rem;
  height: 2.4rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: ${props => props.theme.colors.signatureColor};
  background: ${props => props.theme.colors.highlightColor};
  border-radius: 6px;
`;

const QuestionTitle = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.4;
  word-break: keep-all;
`;