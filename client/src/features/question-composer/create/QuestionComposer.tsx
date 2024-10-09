import styled from 'styled-components';

import { boardType, boardMutation } from '@/src/entities/qnaboard';

import {
  Container,
} from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';
import { usePageRouter } from '@/src/shared/hooks';

import QuestionCreateForm from './QuestionCreateForm';

function QuestionComposer() {
  const { moveBoardMainPage } = usePageRouter();
  const { mutate: writeBoard } = boardMutation.useWriteBoard();

  const onSubmit = (data: boardType.IWriteQnaBoard) => {
    writeBoard(data);
    moveBoardMainPage();
  };

  return (
    <ComposerContainer>
      <QuestionCreateForm onSubmit={onSubmit} />
    </ComposerContainer>
  );
}

export default QuestionComposer;

const ComposerContainer = styled(Container.ItemBase)`
  ${styleMixin.Flex('flex-start')}
  width: 100%;
  height: 100%;
  gap: 30px;
  @media screen and (max-width: ${V.mediaWeb}) {
    ${styleMixin.Column('flex-start')}
  }
`;
