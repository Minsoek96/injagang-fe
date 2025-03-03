import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';
import { interviewType } from '@/src/entities/interview_question';

import ExpectedQuestionItem from './ExpectedQuestionItem';

interface ExpectedQuestionListProps {
  questions: interviewType.IQuestion[];
  checkList: number[];
  handleCheckList: (id: number, isCheck: boolean) => void;
}

/** ExpectedQuestionList :  예상 질문 리스트
 *
 * @param questions : 질문 리스트
 * @param checkList : 체크 리스트 목록
 * @param handleChekcList : 체크 리스트 목록 제어 함수
 */
function ExpectedQuestionList({
  questions,
  checkList,
  handleCheckList,
}: ExpectedQuestionListProps) {
  if (!questions.length) {
    return (
      <Container>
        <EmptyText>선택된 리스트가 존재하지 않습니다.!!!</EmptyText>
      </Container>
    );
  }
  return (
    <Container>
      {questions
        && questions.map((question) => (
          <ExpectedQuestionItem
            key={question.id}
            onChange={handleCheckList}
            isChecked={checkList.includes(question.id)}
            question={question.questions}
            id={question.id}
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

const EmptyText = styled.p`
  ${styleMixin.Column()}
  height: 100%;
  font-size: 1.8rem;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 1px;
  text-decoration-color: ${(props) => props.theme.colors.emptyGray};
`;
