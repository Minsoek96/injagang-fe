import { useCallback } from 'react';

import { styled } from 'styled-components';

import {
  interviewQueries,
  useQuestionStore,
  interviewMutation,
} from '@/src/entities/interview_question';

import { useCheckList, useModal } from '@/src/shared/hooks';
import { Container } from '@/src/shared/ui';

import QuestionTypeSelector from './QuestionTypeSelector';
import ExpectedQuestionList from './ExpectedQuestionList';
import ActionButtons from './ActionButtons';

function ExpectedQuestionSelector() {
  const { setModal } = useModal();
  const { setUserPlayList } = useQuestionStore();
  const { data: interViewQuestionList = [] } = interviewQueries.useFetchQuestions();
  const { mutate: deleteQuestions } = interviewMutation.useDeleteInterViewQ();

  /** 체크리스트 상태 관리 */
  const {
    checkList, handleAllCheck, handleCheckList, isAllCheck, clearCheckList,
  } = useCheckList(interViewQuestionList);

  /** 선택된 질문 추가 함수 */
  const addQuestions = useCallback(() => {
    const selectedQuestions = interViewQuestionList.filter((question) =>
      checkList.includes(question.id));
    const questionTexts = selectedQuestions.map((item) => item.questions);
    setUserPlayList(questionTexts);
  }, [interViewQuestionList, checkList]);

  /** 선택된 질문 삭제 함수 */
  const removeQuestions = useCallback(() => {
    if (!checkList.length) {
      setModal({
        contents: {
          title: 'Warring',
          message: '선택된 질문이 없습니다.',
        },
      });
      return;
    }
    const formmatData = {
      ids: checkList,
    };
    deleteQuestions(formmatData);
  }, [checkList]);

  return (
    <Container.ArticleCard
      $size={{ height: '60rem', width: '100%', flex: 'Col' }}
    >
      <Header>Questions by Type</Header>
      <QuestionTypeSelector onReset={clearCheckList} />
      <ExpectedQuestionList
        questions={interViewQuestionList}
        checkList={checkList}
        handleCheckList={handleCheckList}
      />
      <ActionButtons
        onAdd={addQuestions}
        isAllChecked={isAllCheck}
        onRemove={removeQuestions}
        onChecked={handleAllCheck}
      />
    </Container.ArticleCard>
  );
}

export default ExpectedQuestionSelector;

const Header = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;
