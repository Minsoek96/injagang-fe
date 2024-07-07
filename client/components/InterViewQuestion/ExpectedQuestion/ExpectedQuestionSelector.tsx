import useCheckList from '@/hooks/useCheckList';
import { Card } from '@/styles/GlobalStyle';
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

  const {
    selectedType, dispatchSelectedType,
    dispatchSelectedQuestions,
  } = useEUserQuestionManager({
    typeCheckCallback: isAllCheck ? handleAllCheck : () => {},
  });

  return (
    <Card $size={{ height: '450px', width: '100%', flex: 'Col' }}>
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
    </Card>
  );
}

export default ExpectedQuestionSelector;
