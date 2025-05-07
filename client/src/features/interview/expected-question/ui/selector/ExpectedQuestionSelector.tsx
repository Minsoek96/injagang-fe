import { useCallback } from 'react';

import { styled } from 'styled-components';

import {
  interviewQueries,
  useIntvPlaylistStore,
  interviewMutation,
} from '@/src/entities/interview_question';

import { useCheckList, useModal } from '@/src/shared/hooks';
import { Container, ErrorBoundary, MainButton } from '@/src/shared/ui';
import { styleMixin } from '@/src/shared/styles';

import { QuestionTypeSelector } from './question-type-selector';
import { ExpectedQuestionList } from './expected-question-list';
import { ActionButtons } from './action-button';

function ExpectedQuestionSelector() {
  const { setModal } = useModal();
  const setUserPlayList = useIntvPlaylistStore(
    (state) => state.setUserPlayList,
  );
  const { data: interViewQuestionList = [] } = interviewQueries.useFetchQuestions();
  const { mutate: deleteQuestions } = interviewMutation.useDeleteInterViewQ();

  /** 체크리스트 상태 관리 */
  const {
    checkList,
    handleAllCheck,
    handleCheckList,
    isAllCheck,
    clearCheckList,
  } = useCheckList(interViewQuestionList);

  /** 선택된 질문 추가 함수 */
  const addQuestions = useCallback(() => {
    const selectedQuestions = interViewQuestionList.filter((question) =>
      checkList.includes(question.id));
    const questionTexts = selectedQuestions.map((item) => item.questions);

    if (!questionTexts.length) {
      return;
    }

    setUserPlayList(questionTexts);
    clearCheckList();
  }, [interViewQuestionList, checkList]);

  /** 선택된 질문 삭제 함수 */
  const removeQuestions = useCallback(() => {
    if (!checkList.length) {
      setModal({
        title: 'Warring',
        message: '선택된 질문이 없습니다.',
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
      <ErrorBoundary
        renderFallback={(_, onReset) => (
          <ErrorFallback>
            <h3>잠시만요!</h3>
            <p>질문을 불러오는 중 문제가 발생했습니다.</p>
            <p>불편을 끼쳐 죄송합니다.🙇‍♂️🙇‍♂️🙇‍♂️</p>
            <MainButton
              onClick={onReset}
              label="다시 시도"
              variant="signature"
            />
          </ErrorFallback>
        )}
      >
        <QuestionTypeSelector onReset={clearCheckList} />
        <ExpectedQuestionList
          questions={interViewQuestionList}
          checkList={checkList}
          handleCheckList={handleCheckList}
        />
        <ActionButtons
          onAdd={addQuestions}
          isAllChecked={isAllCheck}
          isChecked={!!checkList.length}
          onRemove={removeQuestions}
          onChecked={handleAllCheck}
        />
      </ErrorBoundary>
    </Container.ArticleCard>
  );
}

export default ExpectedQuestionSelector;

const Header = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const ErrorFallback = styled.div`
  ${styleMixin.Column()}
  width: 100%;
  height: 100%;
  padding: 3rem;
  border-radius: 0.8rem;
  background-color: ${(props) => props.theme.colors.primary};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
  gap: 2rem;

  p {
    font-size: 1.6rem;
    line-height: 1;
  }

  h3 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;
