import { Suspense } from 'react';

import styled from 'styled-components';

import { boardType, boardMutation } from '@/src/entities/qnaboard';

import {
  Container,
  ErrorBoundary,
  ErrorFallback,
  Spinner,
} from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';
import { usePageRouter } from '@/src/shared/hooks';

import { QuestionCreateForm } from '@/src/features/question-composer';

function Question() {
  const { moveBoardMainPage } = usePageRouter();
  const { mutate: writeBoard } = boardMutation.useWriteBoard();

  const onSubmit = (data: boardType.IWriteQnaBoard) => {
    writeBoard(data);
    moveBoardMainPage();
  };

  return (
    <ErrorBoundary
      renderFallback={(_, onReset) => (
        <ErrorFallback
          title="데이터를 불러올 수 없습니다."
          message={
            '자소서 데이터를 불러오는 과정에서 문제가 발생했습니다. \n 잠시 후 다시 시도해 주세요.'
          }
          onReset={onReset}
        />
      )}
    >
      <Suspense fallback={<Spinner />}>
        <ComposerContainer>
          <QuestionCreateForm onSubmit={onSubmit} />
        </ComposerContainer>
      </Suspense>
    </ErrorBoundary>
  );
}

export default Question;

const ComposerContainer = styled(Container.ItemBase)`
  ${styleMixin.Flex('flex-start')}
  width: 100%;
  height: 100%;
  gap: 30px;
  @media screen and (max-width: ${V.mediaWeb}) {
    ${styleMixin.Column('flex-start')}
  }
`;
