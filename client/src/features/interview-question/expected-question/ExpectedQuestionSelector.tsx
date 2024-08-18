import { styled } from 'styled-components';

import { useCallback } from 'react';

import {
  interviewQueries,
  useQuestionStore,
} from '@/src/entities/interview_question';
import { useDeleteInterViewQ } from '@/src/entities/interview_question/mutations';
import { useCheckList } from '@/src/shared/hooks';
import { Container } from '@/src/shared/components';

import { useSelectorLogic } from '../hooks';

import QuestionSelector from './QuestionSelector';
import ExpectedQuestionList from './ExpectedQuestionList';
import ActionBtns from './ActionBtns';

function ExpectedQuestionSelector() {
  const { selectedType } = useQuestionStore();
  const { data: interViewQuestionList = [] } = interviewQueries.useFetchQuestions(selectedType);
  const { mutate: deleteQuestions } = useDeleteInterViewQ();

  const {
    checkList, handleAllCheck, handleCheckList, isAllCheck,
  } = useCheckList(interViewQuestionList);

  const { dispatchSelectedType, dispatchSelectedQuestions } = useSelectorLogic({
    typeCheckCallback: isAllCheck ? handleAllCheck : () => {},
  });

  const removeQuestions = useCallback((targetIds: number[]) => {
    const formmatData = {
      ids: targetIds,
    };
    deleteQuestions(formmatData);
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
