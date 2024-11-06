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
