import { useCallback } from 'react';

import { styled } from 'styled-components';

import {
  interviewQueries,
  useQuestionStore,
  interviewMutation,
} from '@/src/entities/interview_question';

import { useCheckList, useModal } from '@/src/shared/hooks';
import { Container } from '@/src/shared/ui';

import { useSelectorLogic } from '../hooks';
import QuestionSelector from './QuestionSelector';
import ExpectedQuestionList from './ExpectedQuestionList';
import ActionBtns from './ActionBtns';

function ExpectedQuestionSelector() {
  const { setModal } = useModal();
  const { selectedType } = useQuestionStore();
  const { data: interViewQuestionList = [] } = interviewQueries.useFetchQuestions(selectedType);
  const { mutate: deleteQuestions } = interviewMutation.useDeleteInterViewQ();

  const {
    checkList, handleAllCheck, handleCheckList, isAllCheck, clearCheckList,
  } = useCheckList(interViewQuestionList);

  const { dispatchSelectedType, dispatchSelectedQuestions } = useSelectorLogic({
    typeCheckCallback: isAllCheck ? handleAllCheck : () => {},
  });

  const removeQuestions = useCallback((targetIds: number[]) => {
    if (!targetIds.length) {
      setModal({
        contents: {
          title: 'Warring',
          message: '선택된 질문이 없습니다.',
        },
      });
      return;
    }
    const formmatData = {
      ids: targetIds,
    };
    deleteQuestions(formmatData);
    clearCheckList();
  }, []);

  return (
    <Container.ArticleCard
      $size={{ height: '60rem', width: '100%', flex: 'Col' }}
    >
      <Header>Questions by Type</Header>
      <QuestionSelector
        selectedType={selectedType}
        onChange={dispatchSelectedType}
      />
      <ExpectedQuestionList
        questions={interViewQuestionList}
        isAllCheck={isAllCheck}
        handleCheckList={handleCheckList}
      />
      <ActionBtns
        checkList={checkList}
        onAdd={dispatchSelectedQuestions}
        isAllChecked={isAllCheck}
        onRemove={removeQuestions}
        onToggleAll={handleAllCheck}
        questions={interViewQuestionList}
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
