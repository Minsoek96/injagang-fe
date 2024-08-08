import { useCheckList } from '@/src/shared/hooks';
import { Container } from '@/src/shared/components';
import { styled } from 'styled-components';
import QuestionSelector from './QuestionSelector';
import ExpectedQuestionList from './ExpectedQuestionList';
import ActionBtns from './ActionBtns';

import useEUserQuestionManager from '../hooks/useEUserQuestionManager';
import useExpectedQuestionManager from '../hooks/useExpectedQuestionManager';

function ExpectedQuestionSelector() {
  const { interViewQuestionList, dispatchRemoveQuestions } = useExpectedQuestionManager();

  const {
    checkList, handleAllCheck, handleCheckList, isAllCheck,
  } = useCheckList(interViewQuestionList);

  const
    { selectedType, dispatchSelectedType, dispatchSelectedQuestions } = useEUserQuestionManager({
      typeCheckCallback: isAllCheck ? handleAllCheck : () => {},
    });

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
        onRemove={dispatchRemoveQuestions}
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
