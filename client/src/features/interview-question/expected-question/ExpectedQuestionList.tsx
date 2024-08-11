import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';
import { interviewType } from '@/src/entities/interview_question';
import ExpectedQuestionListItem from './ExpectedQuestionListItem';

interface ExpectedQuestionListProps {
  questions: interviewType.IQuestion[];
  isAllCheck: boolean;
  handleCheckList: (id: number, isCheck: boolean) => void;
}
function ExpectedQuestionList({
  questions,
  isAllCheck,
  handleCheckList,
}: ExpectedQuestionListProps) {
  return (
    <Container>
      {questions
        && questions.map((question) => (
          <ExpectedQuestionListItem
            key={question.id}
            allCheck={isAllCheck}
            onChange={handleCheckList}
            {...question}
          />
        ))}
    </Container>
  );
}

export default ExpectedQuestionList;

const Container = styled.ul`
  ${styleMixin.ScrollBar}
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`;
